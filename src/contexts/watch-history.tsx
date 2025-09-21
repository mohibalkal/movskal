import { useState, useEffect, useCallback, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useAuth } from '@/hooks';
import { useUserPreferences } from '@/hooks/user-preferences';
import { getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where, 
  deleteField, 
  limit, 
  orderBy, 
  startAfter, 
  writeBatch,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { safeFirestoreOperation, reauthenticateUser, checkFirestorePermissions } from '@/lib/firebase';
import { generateId } from '@/utils/supabase';
import { Media } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';
import { 
  WatchHistoryContext,
  WatchHistoryItem,
  FavoriteItem,
  WatchlistItem,
  MediaBaseItem,
  WatchHistoryContextType 
} from './types/watch-history';
import { RateLimiter } from '@/utils/rate-limiter';
import { 
  deduplicateWatchHistory, 
  filterWatchHistoryDuplicates,
  isSignificantProgress 
} from '@/utils/watch-history-utils';

const LOCAL_STORAGE_HISTORY_KEY = 'fdf_watch_history';
const ITEMS_PER_PAGE = 20;
const MAX_LOCAL_HISTORY = 50;
const DEBOUNCE_WINDOW = 300000; // 5 minutes
const SIGNIFICANT_PROGRESS = 60; // 60 seconds
const MINIMUM_UPDATE_INTERVAL = 30000; // 30 seconds
const lastUpdateTimestamps = new Map<string, number>();
const pendingOperations: Array<() => Promise<void>> = [];

const app = getApp();
let db: ReturnType<typeof getFirestore>;
try {
  db = getFirestore(app);
  
  // Ensure we're using the correct project
  if (db && (db as any)._delegate && (db as any)._delegate._databaseId) {
    (db as any)._delegate._databaseId.projectId = "kalstream-b2daf";
  }
  
} catch (error) {
  console.error('Failed to initialize Firestore:', error);
  throw error;
}

const readRateLimiter = RateLimiter.getInstance(200, 300000);
const writeRateLimiter = RateLimiter.getInstance(100, 300000);
const deleteRateLimiter = RateLimiter.getInstance(50, 300000);

const queueOperation = (operation: () => Promise<void>) => {
  pendingOperations.push(operation);
};

const processPendingOperations = async () => {
  while (pendingOperations.length > 0) {
    const operation = pendingOperations.shift();
    if (operation) {
      try {
        // Check permissions before operation
        const hasPermissions = await checkFirestorePermissions();
        if (!hasPermissions) {
          console.warn('No Firestore permissions, skipping operation');
          break;
        }
        
        await safeFirestoreOperation(operation);
      } catch (error) {
        console.error('Error processing pending operation:', error);
        
        // Try to re-authenticate if permission error
        if (error instanceof Error && error.message.includes('permissions')) {
          console.warn('Attempting to re-authenticate user...');
          const reauthSuccess = await reauthenticateUser();
          if (reauthSuccess) {
            // Retry the operation
            try {
              await safeFirestoreOperation(operation);
            } catch (retryError) {
              console.error('Retry failed:', retryError);
            }
          }
        }
        
        // Don't re-queue failed operations to prevent infinite loops
        break;
      }
    }
  }
};

interface QueuedUpdate {
  historyRef: ReturnType<typeof doc>;
  updatedItemData: Partial<WatchHistoryItem>;
}

const watchPositionQueue = new Map<string, {
  data: QueuedUpdate,
  timestamp: number
}>();

export function WatchHistoryProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { userPreferences } = useUserPreferences();
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const { toast } = useToast();

  const processWatchPositionQueue = useCallback(async () => {
    if (!navigator.onLine || watchPositionQueue.size === 0) return;

    try {
      const batch = writeBatch(db);
      let batchCount = 0;
      const now = Date.now();
      const processedKeys = [];

      for (const [key, { data, timestamp }] of watchPositionQueue.entries()) {
        if (now - timestamp < MINIMUM_UPDATE_INTERVAL) continue;

        const canExecute = await writeRateLimiter.canExecute();
        if (!canExecute) {
          console.log('Write rate limit exceeded. Remaining updates will be processed later.');
          break;
        }

        const { historyRef, updatedItemData } = data;
        batch.set(historyRef, updatedItemData, { merge: true });
        processedKeys.push(key);
        batchCount++;

        if (batchCount >= 500) {
          await batch.commit();
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await batch.commit();
      }

      processedKeys.forEach(key => watchPositionQueue.delete(key));
    } catch (error) {
      console.error('Error processing watch position queue:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(processWatchPositionQueue, MINIMUM_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [processWatchPositionQueue]);

  useEffect(() => {
    const handleOnline = async () => {
      console.log('Back online, processing pending operations...');
      await processPendingOperations();
    };

    const handleOffline = () => {
      console.log('Went offline, operations will be queued');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.onLine) {
      processPendingOperations();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadLocalWatchHistory = useCallback(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (!storedHistory) return [];
      const history = JSON.parse(storedHistory);
      return history.slice(0, MAX_LOCAL_HISTORY);
    } catch (error) {
      console.error('Error loading local watch history:', error);
      return [];
    }
  }, []);

  const saveLocalWatchHistory = useCallback((history: WatchHistoryItem[]) => {
    try {
      const recentHistory = history.slice(0, MAX_LOCAL_HISTORY);
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(recentHistory));
    } catch (error) {
      console.error('Error saving local watch history:', error);
    }
  }, []);

  const fetchWatchHistory = useCallback(async (isInitial: boolean = false) => {
    if (!user) {
      const localHistory = loadLocalWatchHistory();
      const deduplicatedHistory = deduplicateWatchHistory(localHistory);
      setWatchHistory(deduplicatedHistory);
      setHasMore(false);
      if (isInitial) {
        setInitialFetchDone(true);
      }
      return;
    }

    // Check permissions before fetching
    const hasPermissions = await checkFirestorePermissions();
    if (!hasPermissions) {
      console.warn('No Firestore permissions, using local history');
      const localHistory = loadLocalWatchHistory();
      const deduplicatedHistory = deduplicateWatchHistory(localHistory);
      setWatchHistory(deduplicatedHistory);
      setHasMore(false);
      if (isInitial) {
        setInitialFetchDone(true);
      }
      return;
    }

    try {
      setIsLoading(true);
      const historyRef = collection(db, 'watchHistory');
      let historyQuery;

      if (isInitial) {
        historyQuery = query(
          historyRef,
          where('user_id', '==', user.uid),
          orderBy('created_at', 'desc'),
          limit(ITEMS_PER_PAGE)
        );
      } else if (lastVisible) {
        historyQuery = query(
          historyRef,
          where('user_id', '==', user.uid),
          orderBy('created_at', 'desc'),
          startAfter(lastVisible),
          limit(ITEMS_PER_PAGE)
        );
      } else {
        return;
      }

      const canExecute = await readRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Read rate limit exceeded. Skipping Firestore fetch.');
        return;
      }

      const historySnapshot = await getDocs(historyQuery);
      
      if (historySnapshot.empty) {
        setHasMore(false);
        if (isInitial) {
          setInitialFetchDone(true);
        }
        return;
      }

      setLastVisible(historySnapshot.docs[historySnapshot.docs.length - 1] as QueryDocumentSnapshot<DocumentData>);
      
      const historyData = historySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<WatchHistoryItem, 'id'>,
        created_at: (doc.data() as { created_at?: string })?.created_at || new Date().toISOString()
      }));

      if (isInitial) {
        const deduplicatedHistory = deduplicateWatchHistory(historyData);
        setWatchHistory(deduplicatedHistory);
      } else {
        const combinedHistory = [...watchHistory, ...historyData];
        const deduplicatedHistory = deduplicateWatchHistory(combinedHistory);
        setWatchHistory(deduplicatedHistory);
      }

      setHasMore(historySnapshot.docs.length === ITEMS_PER_PAGE);
      if (isInitial) {
        setInitialFetchDone(true);
      }
    } catch (error) {
      console.error('Error fetching watch history:', error);
      toast({
        title: "Error loading watch history",
        description: "There was a problem loading your watch history.",
        variant: "destructive"
      });
      if (isInitial) {
        setInitialFetchDone(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, lastVisible, loadLocalWatchHistory, watchHistory, toast]);

  const fetchFavorites = useCallback(async () => {
    if (!user) return;
    
    try {
      const favoritesRef = collection(db, 'favorites');
      const favoritesQuery = query(
        favoritesRef,
        where('user_id', '==', user.uid),
        orderBy('added_at', 'desc')
      );
      
      const canExecute = await readRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Read rate limit exceeded. Skipping Firestore fetch.');
        return;
      }

      const snapshot = await getDocs(favoritesQuery);
      const favoritesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FavoriteItem[];
      
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, [user]);

  const fetchWatchlist = useCallback(async () => {
    if (!user) return;
    
    try {
      const watchlistRef = collection(db, 'watchlist');
      const watchlistQuery = query(
        watchlistRef,
        where('user_id', '==', user.uid),
        orderBy('added_at', 'desc')
      );
      
      const canExecute = await readRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Read rate limit exceeded. Skipping Firestore fetch.');
        return;
      }

      const snapshot = await getDocs(watchlistQuery);
      const watchlistData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WatchlistItem[];
      
      setWatchlist(watchlistData);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  }, [user]);
  useEffect(() => {
    const fetchAllData = async () => {
      if (!initialFetchDone || user) {
        setIsLoading(true);
        try {
          await Promise.all([
            fetchWatchHistory(true),
            fetchFavorites(),
            fetchWatchlist()
          ]);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      } else if (!user) {
        setWatchHistory([]);
        setFavorites([]);
        setWatchlist([]);
        setIsLoading(false);
      }
    };

    fetchAllData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initialFetchDone]); // Remove function dependencies to prevent infinite loop

  useEffect(() => {
    const migrateWatchHistory = async () => {
      if (!user) return;
      
      // Check permissions before migration
      const hasPermissions = await checkFirestorePermissions();
      if (!hasPermissions) {
        console.warn('No Firestore permissions, skipping migration');
        return;
      }
      
      try {
        const historyRef = collection(db, 'watchHistory');
        const historyQuery = query(historyRef, where('user_id', '==', user.uid));
        
        const canExecute = await readRateLimiter.canExecute();
        if (!canExecute) {
          console.log('Read rate limit exceeded. Skipping Firestore migration.');
          return;
        }
        
        const historySnapshot = await getDocs(historyQuery);
        
        const migrationPromises = historySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          if ('last_watched' in data) {
            await setDoc(doc.ref, { last_watched: deleteField() }, { merge: true });
          }
        });
        
        await Promise.all(migrationPromises);
      } catch (error) {
        console.error('Error migrating watch history:', error);
      }
    };
    
    if (user && initialFetchDone) {
      migrateWatchHistory();
    }
  }, [user, initialFetchDone]);
  const addToWatchHistory = async (
    media: Media, 
    position: number, 
    duration: number, 
    season?: number, 
    episode?: number,
    preferredSource?: string
  ) => {
    if (!user) {
      console.warn('Cannot add to watch history: User not authenticated');
      toast({
        title: "Authentication required",
        description: "Please log in to track your watch history.",
        variant: "destructive"
      });
      return;
    }
    
    if (!userPreferences?.isWatchHistoryEnabled) {
      console.log('Watch history is disabled in user preferences');
      return;
    }

    // Verify authentication state is valid
    if (!user.uid) {
      console.error('Invalid authentication state: missing user ID');
      return;
    }

    const mediaType = media.media_type;
    const mediaId = media.id;
    const title = media.title || media.name || '';
    const mediaKey = `${mediaId}-${mediaType}-${season || ''}-${episode || ''}`;
    const now = Date.now();
    const lastUpdate = lastUpdateTimestamps.get(mediaKey) || 0;

    if (now - lastUpdate < MINIMUM_UPDATE_INTERVAL) return;

    const newItem: WatchHistoryItem = {
      id: generateId(),
      user_id: user.uid,
      media_id: mediaId,
      media_type: mediaType,
      title,
      poster_path: media.poster_path,
      backdrop_path: media.backdrop_path,
      overview: media.overview || undefined,
      rating: media.vote_average || 0,
      watch_position: position,
      duration,
      created_at: new Date().toISOString(),
      preferred_source: preferredSource || '',
      ...(typeof season === 'number' ? { season } : {}),
      ...(typeof episode === 'number' ? { episode } : {})
    };

    const { items: updatedHistory, existingItem } = filterWatchHistoryDuplicates(watchHistory, newItem);
    
    if (existingItem && position > 0) {
      if (!isSignificantProgress(existingItem.watch_position, position, SIGNIFICANT_PROGRESS)) {
        return;
      }
    }
    
    setWatchHistory(updatedHistory);
    saveLocalWatchHistory(updatedHistory);
    lastUpdateTimestamps.set(mediaKey, now);

    if (!navigator.onLine) {
      console.log('Queueing watch history update for later');
      queueOperation(async () => {
        const historyRef = doc(db, 'watchHistory', newItem.id);
        await setDoc(historyRef, newItem);
      });
      return;
    }

    // Check permissions before writing
    const hasPermissions = await checkFirestorePermissions();
    if (!hasPermissions) {
      console.warn('No Firestore permissions, skipping watch history update');
      return;
    }

    const canExecute = await writeRateLimiter.canExecute();
    if (!canExecute) {
      console.log('Write rate limit exceeded. Queueing update for later');
      queueOperation(async () => {
        const historyRef = doc(db, 'watchHistory', newItem.id);
        await setDoc(historyRef, newItem);
      });
      return;
    }

    try {
      if (existingItem) {
        const existingRef = doc(db, 'watchHistory', existingItem.id);
        await deleteDoc(existingRef);
      }
      
      const historyRef = doc(db, 'watchHistory', newItem.id);
      await setDoc(historyRef, newItem);
    } catch (error) {
      console.error('Error adding to watch history:', error);
      queueOperation(async () => {
        const historyRef = doc(db, 'watchHistory', newItem.id);
        await setDoc(historyRef, newItem);
      });
    }
  };

  const updateWatchPosition = async (
    mediaId: number, 
    mediaType: 'movie' | 'tv', 
    position: number, 
    season?: number, 
    episode?: number,
    preferredSource?: string
  ) => {
    if (!user) return;

    const mediaKey = `${mediaId}-${mediaType}-${season || ''}-${episode || ''}`;
    const now = Date.now();
    const lastUpdate = lastUpdateTimestamps.get(mediaKey) || 0;

    if (now - lastUpdate < MINIMUM_UPDATE_INTERVAL) {
      return;
    }

    lastUpdateTimestamps.set(mediaKey, now);

    const updatedItemData = {
      watch_position: position,
      created_at: new Date().toISOString(),
      ...(typeof season === 'number' ? { season } : {}),
      ...(typeof episode === 'number' ? { episode } : {}),
      ...(preferredSource ? { preferred_source: preferredSource } : {})
    };
    
    try {
      const existingItem = watchHistory.find(item => 
        item.media_id === mediaId && 
        item.media_type === mediaType &&
        item.season === season &&
        item.episode === episode
      );

      const canExecute = await writeRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Write rate limit exceeded. Skipping Firestore update.');
        if (existingItem) {
          const updatedHistory = watchHistory.map(h => 
            h.id === existingItem.id ? { ...h, ...updatedItemData } : h
          );
          setWatchHistory(updatedHistory);
          saveLocalWatchHistory(updatedHistory);
        }
        return;
      }

      if (existingItem) {
        const progressDifference = Math.abs(existingItem.watch_position - position);
        if (progressDifference < SIGNIFICANT_PROGRESS) {
          return;
        }

        const historyRef = doc(db, 'watchHistory', existingItem.id);
        watchPositionQueue.set(mediaKey, { data: { historyRef, updatedItemData }, timestamp: now });

        const updatedHistory = watchHistory.map(h => 
          h.id === existingItem.id ? { ...h, ...updatedItemData } : h
        );
        setWatchHistory(updatedHistory);
        saveLocalWatchHistory(updatedHistory);
      }
    } catch (error) {
      console.error('Error updating watch position:', error);
      toast({
        title: "Error updating progress",
        description: "There was a problem updating your watch progress.",
        variant: "destructive"
      });
    }
  };
  
  const clearWatchHistory = async () => {
    if (!user) return;
    
    if (!navigator.onLine) {
      setWatchHistory([]);
      saveLocalWatchHistory([]);
      toast({
        title: "Watch history cleared",
        description: "Your watch history has been successfully cleared."
      });
      return;
    }

    try {
      const historyRef = collection(db, 'watchHistory');
      const historyQuery = query(historyRef, where('user_id', '==', user.uid));
      const historySnapshot = await getDocs(historyQuery);
      
      const canExecute = await deleteRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Delete rate limit exceeded. Skipping Firestore delete.');
        return;
      }

      const deletePromises = historySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
      setWatchHistory([]);
      saveLocalWatchHistory([]);
      
      toast({
        title: "Watch history cleared",
        description: "Your watch history has been successfully cleared."
      });
    } catch (error) {
      console.error('Error clearing watch history:', error);
      toast({
        title: "Error clearing history",
        description: "There was a problem clearing your watch history.",
        variant: "destructive"
      });
    }
  };

  const deleteWatchHistoryItem = async (id: string) => {
    if (!user) return;
    
    try {
      const canExecute = await deleteRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Delete rate limit exceeded. Skipping Firestore delete.');
        return;
      }

      const historyRef = doc(db, 'watchHistory', id);
      await deleteDoc(historyRef);
      
      const updatedHistory = watchHistory.filter(item => item.id !== id);
      setWatchHistory(updatedHistory);
      saveLocalWatchHistory(updatedHistory);
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your watch history."
      });
    } catch (error) {
      console.error('Error deleting watch history item:', error);
      toast({
        title: "Error removing item",
        description: "There was a problem removing the item from your history.",
        variant: "destructive"
      });
    }
  };

  const deleteSelectedWatchHistory = async (ids: string[]) => {
    if (!user || ids.length === 0) return;
    
    try {
      const canExecute = await deleteRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Delete rate limit exceeded. Please try again later.');
        toast({
          title: "Rate limit exceeded",
          description: "Too many operations in a short time. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      const batch = writeBatch(db);
      ids.forEach(id => {
        const historyRef = doc(db, 'watchHistory', id);
        batch.delete(historyRef);
      });
      
      await batch.commit();
      
      const updatedHistory = watchHistory.filter(item => !ids.includes(item.id));
      setWatchHistory(updatedHistory);
      saveLocalWatchHistory(updatedHistory);
      
      toast({
        title: "Items removed",
        description: `${ids.length} ${ids.length === 1 ? 'item has' : 'items have'} been removed from your watch history.`
      });
    } catch (error) {
      console.error('Error deleting watch history items:', error);
      toast({
        title: "Error removing items",
        description: "There was a problem removing the items from your history.",
        variant: "destructive"
      });
    }
  };


  // Import at top: import { trackEvent } from '@/lib/analytics';

  const addToFavorites = async (item: MediaBaseItem) => {
    if (!user) {
      console.log('Cannot add to favorites: User not authenticated');
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your favorites.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      console.log('Adding to favorites:', item);
      const existingItem = favorites.find(fav => 
        fav.media_id === item.media_id && fav.media_type === item.media_type
      );
      
      if (existingItem) {
        console.log('Item already in favorites:', existingItem);
        return;
      }
      
      const newItem: FavoriteItem = {
        id: generateId(),
        user_id: user.uid,
        media_id: item.media_id,
        media_type: item.media_type,
        title: item.title,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        rating: item.rating,
        added_at: new Date().toISOString()
      };
      
      console.log('Saving favorite to Firestore:', newItem);
      const favoriteRef = doc(db, 'favorites', newItem.id);
      await setDoc(favoriteRef, newItem);
      
      console.log('Favorite saved successfully');
      const updatedFavorites = [newItem, ...favorites];
      setFavorites(updatedFavorites);

      // Analytics event
      trackEvent({
        name: 'favorites_add',
        params: {
          media_type: item.media_type,
          media_id: String(item.media_id),
          title: item.title,
        },
      });

      toast({
        title: "Added to favorites",
        description: `${item.title} has been added to your favorites.`
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error adding to favorites",
        description: error instanceof Error ? error.message : "There was a problem adding to your favorites.",
        variant: "destructive"
      });
    }
  };

  const removeFromFavorites = async (mediaId: number, mediaType: 'movie' | 'tv') => {
    if (!user) return;
    
    try {
      const itemToRemove = favorites.find(
        item => item.media_id === mediaId && item.media_type === mediaType
      );

      if (itemToRemove) {
        const favoriteRef = doc(db, 'favorites', itemToRemove.id);
        await deleteDoc(favoriteRef);
        
        const updatedFavorites = favorites.filter(
          item => !(item.media_id === mediaId && item.media_type === mediaType)
        );
        setFavorites(updatedFavorites);
      }
      // Analytics event
      trackEvent({
        name: 'favorites_remove',
        params: {
          media_type: mediaType,
          media_id: String(mediaId),
        },
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast({
        title: "Error removing from favorites",
        description: "There was a problem removing from your favorites.",
        variant: "destructive"
      });
    }
  };

  const isInFavorites = (mediaId: number, mediaType: 'movie' | 'tv'): boolean => {
    return favorites.some(item => item.media_id === mediaId && item.media_type === mediaType);
  };

  const deleteFavoriteItem = async (id: string) => {
    if (!user) return;
    
    try {
      const canExecute = await deleteRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Delete rate limit exceeded. Skipping Firestore delete.');
        return;
      }

      const favoriteRef = doc(db, 'favorites', id);
      await deleteDoc(favoriteRef);
      
      const updatedFavorites = favorites.filter(item => item.id !== id);
      setFavorites(updatedFavorites);
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your favorites."
      });
    } catch (error) {
      console.error('Error deleting favorite item:', error);
      toast({
        title: "Error removing item",
        description: "There was a problem removing the item from your favorites.",
        variant: "destructive"
      });
    }
  };

  const deleteSelectedFavorites = async (ids: string[]) => {
    if (!user || ids.length === 0) return;
    
    try {
      const canExecute = await deleteRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Delete rate limit exceeded. Please try again later.');
        toast({
          title: "Rate limit exceeded",
          description: "Too many operations in a short time. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      const batch = writeBatch(db);
      ids.forEach(id => {
        const favoriteRef = doc(db, 'favorites', id);
        batch.delete(favoriteRef);
      });
      
      await batch.commit();
      
      const updatedFavorites = favorites.filter(item => !ids.includes(item.id));
      setFavorites(updatedFavorites);
      
      toast({
        title: "Items removed",
        description: `${ids.length} ${ids.length === 1 ? 'item has' : 'items have'} been removed from your favorites.`
      });
    } catch (error) {
      console.error('Error deleting favorite items:', error);
      toast({
        title: "Error removing items",
        description: "There was a problem removing the items from your favorites.",
        variant: "destructive"
      });
    }
  };

  const addToWatchlist = async (item: MediaBaseItem) => {
    if (!user) {
      console.log('Cannot add to watchlist: User not authenticated');
      toast({
        title: "Authentication required",
        description: "Please log in to add items to your watchlist.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      console.log('Adding to watchlist:', item);
      const existingItem = watchlist.find(watch => 
        watch.media_id === item.media_id && watch.media_type === item.media_type
      );
      
      if (existingItem) {
        console.log('Item already in watchlist:', existingItem);
        return;
      }
      
      const newItem: WatchlistItem = {
        id: generateId(),
        user_id: user.uid,
        media_id: item.media_id,
        media_type: item.media_type,
        title: item.title,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        rating: item.rating,
        added_at: new Date().toISOString()
      };
      
      console.log('Saving watchlist item to Firestore:', newItem);
      const watchlistRef = doc(db, 'watchlist', newItem.id);
      await setDoc(watchlistRef, newItem);
      
      console.log('Watchlist item saved successfully');
      const updatedWatchlist = [newItem, ...watchlist];
      setWatchlist(updatedWatchlist);

      // Analytics event
      trackEvent({
        name: 'watchlist_add',
        params: {
          media_type: item.media_type,
          media_id: String(item.media_id),
          title: item.title,
        },
      });

      toast({
        title: "Added to watchlist",
        description: `${item.title} has been added to your watchlist.`
      });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "Error adding to watchlist",
        description: error instanceof Error ? error.message : "There was a problem adding to your watchlist.",
        variant: "destructive"
      });
    }
  };

  const removeFromWatchlist = async (mediaId: number, mediaType: 'movie' | 'tv') => {
    if (!user) return;
    
    try {
      const itemToRemove = watchlist.find(
        item => item.media_id === mediaId && item.media_type === mediaType
      );

      if (itemToRemove) {
        const watchlistRef = doc(db, 'watchlist', itemToRemove.id);
        await deleteDoc(watchlistRef);
        
        const updatedWatchlist = watchlist.filter(
          item => !(item.media_id === mediaId && item.media_type === mediaType)
        );
        setWatchlist(updatedWatchlist);
      }
      // Analytics event
      trackEvent({
        name: 'watchlist_remove',
        params: {
          media_type: mediaType,
          media_id: String(mediaId),
        },
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "Error removing from watchlist",
        description: "There was a problem removing from your watchlist.",
        variant: "destructive"
      });
    }
  };

  const isInWatchlist = (mediaId: number, mediaType: 'movie' | 'tv'): boolean => {
    return watchlist.some(item => item.media_id === mediaId && item.media_type === mediaType);
  };

  const deleteWatchlistItem = async (id: string) => {
    if (!user) return;
    
    try {
      const canExecute = await deleteRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Delete rate limit exceeded. Skipping Firestore delete.');
        return;
      }

      const watchlistRef = doc(db, 'watchlist', id);
      await deleteDoc(watchlistRef);
      
      const updatedWatchlist = watchlist.filter(item => item.id !== id);
      setWatchlist(updatedWatchlist);
      
      toast({
        title: "Item removed",
        description: "The item has been removed from your watchlist."
      });
    } catch (error) {
      console.error('Error deleting watchlist item:', error);
      toast({
        title: "Error removing item",
        description: "There was a problem removing the item from your watchlist.",
        variant: "destructive"
      });
    }
  };

  const deleteSelectedWatchlist = async (ids: string[]) => {
    if (!user || ids.length === 0) return;
    
    try {
      const canExecute = await deleteRateLimiter.canExecute();
      if (!canExecute) {
        console.log('Delete rate limit exceeded. Please try again later.');
        toast({
          title: "Rate limit exceeded",
          description: "Too many operations in a short time. Please try again later.",
          variant: "destructive"
        });
        return;
      }

      const batch = writeBatch(db);
      ids.forEach(id => {
        const watchlistRef = doc(db, 'watchlist', id);
        batch.delete(watchlistRef);
      });
      
      await batch.commit();
      
      const updatedWatchlist = watchlist.filter(item => !ids.includes(item.id));
      setWatchlist(updatedWatchlist);
      
      toast({
        title: "Items removed",
        description: `${ids.length} ${ids.length === 1 ? 'item has' : 'items have'} been removed from your watchlist.`
      });
    } catch (error) {
      console.error('Error deleting watchlist items:', error);
      toast({
        title: "Error removing items",
        description: "There was a problem removing the items from your watchlist.",
        variant: "destructive"
      });
    }
  };

  return (
    <WatchHistoryContext.Provider value={{
      watchHistory,
      favorites,
      watchlist,
      hasMore,
      isLoading,
      loadMore: () => fetchWatchHistory(false),
      addToWatchHistory,
      updateWatchPosition,
      clearWatchHistory,
      deleteWatchHistoryItem,
      deleteSelectedWatchHistory,
      deleteFavoriteItem,
      deleteSelectedFavorites,
      deleteWatchlistItem,
      deleteSelectedWatchlist,
      addToFavorites,
      removeFromFavorites,
      isInFavorites,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist
    }}>
      {children}
    </WatchHistoryContext.Provider>
  );
}
