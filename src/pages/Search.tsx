import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { triggerHapticFeedback, triggerSuccessHaptic } from '@/utils/haptic-feedback';
import { trackEvent } from '@/lib/analytics';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMedia } from '@/utils/api';
import { Media } from '@/utils/types';
import Navbar from '@/components/Navbar';
import MediaGrid from '@/components/MediaGrid';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { Search as SearchIcon, X, Filter, ChevronDown } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import SearchSuggestions from '@/components/SearchSuggestions';
import ActorSearchResults from '@/components/ActorSearchResults';

const RESULTS_PER_PAGE = 20;

interface ExtendedMedia extends Omit<Media, 'id'> {
  id: string | number;
  media_id: number;
  docId?: string;
  created_at?: string;
  watch_position?: number;
  duration?: number;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const [allResults, setAllResults] = useState<ExtendedMedia[]>([]);
  const [displayedResults, setDisplayedResults] = useState<ExtendedMedia[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [mediaType, setMediaType] = useState<string>(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'popularity');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [mediaSuggestions, setMediaSuggestions] = useState<Media[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && 
          document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
        toast({
          title: t('search.shortcutTitle', 'Search Shortcut'),
          description: t('search.shortcutDescription', 'Press / anytime to quickly search'),
          duration: 2000,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const generateSuggestions = useCallback(async (input: string) => {
    if (!input || input.length < 2) {
      setSuggestions([]);
      setMediaSuggestions([]);
      return;
    }

    try {
      const results = await searchMedia(input);
      
      setMediaSuggestions(results.slice(0, 4));
      
      const apiSuggestions = results.slice(0, 3).map(item => 
        item.title || item.name || ''
      );

      const historySuggestions = searchHistory
        .filter(h => h.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 2);

      const combinedSuggestions = [...new Set([...historySuggestions, ...apiSuggestions])];
      setSuggestions(combinedSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
  }, [searchHistory]);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (!searchQuery) {
      setAllResults([]);
      setDisplayedResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const type = searchParams.get('type') || 'all';
        const sort = searchParams.get('sort') || 'popularity';
        
        const results = await searchMedia(searchQuery);
        
        let filteredResults = results.map(item => ({
          ...item,
          id: item.id,
          media_id: item.id,
          media_type: item.media_type,
          title: item.title || '',
          name: item.name || '',
          poster_path: item.poster_path,
          backdrop_path: item.backdrop_path,
          overview: item.overview,
          vote_average: item.vote_average,
          release_date: item.release_date,
          first_air_date: item.first_air_date,
          genre_ids: item.genre_ids
        })) as ExtendedMedia[];

        if (type !== 'all') {
          filteredResults = filteredResults.filter(item => item.media_type === type);
        }
        
        const sortedResults = [...filteredResults];
        if (sort === 'rating') {
          sortedResults.sort((a, b) => b.vote_average - a.vote_average);
        } else if (sort === 'newest') {
          sortedResults.sort((a, b) => {
            const dateA = a.release_date || a.first_air_date || '';
            const dateB = b.release_date || b.first_air_date || '';
            return dateB.localeCompare(dateA);
          });
        }
        
        setAllResults(sortedResults);
        setDisplayedResults(sortedResults.slice(0, RESULTS_PER_PAGE));
        setPage(1);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setAllResults([]);
        setDisplayedResults([]);
        toast({
          title: t('search.errorTitle', 'Search Error'),
          description: t('search.errorDescription', 'Failed to retrieve search results. Please try again.'),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
    setQuery(searchQuery);
    setMediaType(searchParams.get('type') || 'all');
    setSortBy(searchParams.get('sort') || 'popularity');
  }, [searchParams, toast]);

  const updateSearchHistory = useCallback((term: string) => {
    setSearchHistory(prev => {
      const newHistory = [term, ...prev.filter(h => h !== term)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    triggerHapticFeedback(20);
    if (e) {
      e.preventDefault();
    }
    if (!query.trim()) return;
    let searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
    if (advancedSearch) {
      if (mediaType !== 'all') {
        searchUrl += `&type=${mediaType}`;
      }
      if (sortBy !== 'popularity') {
        searchUrl += `&sort=${sortBy}`;
      }
    }
    updateSearchHistory(query.trim());
    // Analytics: log search event
    await trackEvent({
      name: 'search',
      params: {
        query: query.trim(),
        mediaType,
        sortBy,
        advanced: advancedSearch,
      },
    });
    navigate(searchUrl);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    navigate('/search');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    generateSuggestions(value);
    if (value.length > 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion: string | Media) => {
    if (typeof suggestion === 'string') {
      setQuery(suggestion);
      updateSearchHistory(suggestion);
      // Analytics: log search suggestion click
      await trackEvent({
        name: 'search_suggestion_click',
        params: {
          suggestion,
          query,
        },
      });
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    } else {
      // Analytics: log search result click
      await trackEvent({
        name: 'search_result_click',
        params: {
          mediaId: suggestion.id,
          mediaType: suggestion.media_type,
          title: suggestion.title || suggestion.name,
          query,
        },
      });
      navigate(`/${suggestion.media_type}/${suggestion.id}`);
      toast({
        title: t('search.navigatingTitle', 'Navigating...'),
        description: t('search.navigatingDescription', { name: suggestion.title || suggestion.name }),
        duration: 2000,
      });
      const term = suggestion.title || suggestion.name || '';
      if (term) {
        updateSearchHistory(term);
      }
    }
    setShowSuggestions(false);
  };

  const handleShowMore = () => {
    const nextPage = page + 1;
    const nextResults = allResults.slice(0, nextPage * RESULTS_PER_PAGE);
    setDisplayedResults(nextResults);
    setPage(nextPage);
  };

  const hasMoreResults = allResults.length > displayedResults.length;

const toggleAdvancedSearch = () => {
    triggerHapticFeedback(20);
    setAdvancedSearch(!advancedSearch);
  };

const clearSearchHistory = () => {
    triggerHapticFeedback(15);
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
    toast({
      title: "Search history cleared",
      description: "Your search history has been cleared.",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">{t('search.pageHeading', 'Search')}</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Input
                ref={searchInputRef}
                type="search"
                placeholder={t('search.placeholder', 'Search for movies, TV shows...')}
                className="bg-white/10 border-white/10 pl-10 pr-10 text-white placeholder:text-white/50 h-12"
                value={query}
                onChange={handleInputChange}
                onFocus={() => query.length > 1 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              {query && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              {showSuggestions && (
                mediaSuggestions.length > 0 ? (
                  <SearchSuggestions 
                    suggestions={mediaSuggestions} 
                    onSuggestionClick={handleSuggestionClick}
                    searchQuery={query}
                    onViewAllResults={() => handleSearch()}
                  />
                ) : suggestions.length > 0 ? (
                  <SearchSuggestions 
                    suggestions={suggestions} 
                    onSuggestionClick={handleSuggestionClick}
                    searchQuery={query}
                    onViewAllResults={() => handleSearch()}
                  />
                ) : null
              )}
            </div>
            
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/80 h-12 px-6 ml-auto md:ml-0"
              >
                <SearchIcon className="h-4 w-4 mr-2" />
                {t('search.searchButton', 'Search')}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="border-white/10 text-white h-12"
                onClick={toggleAdvancedSearch}
              >
                <Filter className="h-4 w-4 mr-2" />
                {t('search.advancedSearch', 'Advanced Search')}
              </Button>
            </div>
            
            {advancedSearch && (
              <div className="p-4 rounded-md bg-white/5 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">{t('search.mediaType', 'Media Type')}</label>
                    <Select 
                      value={mediaType} 
                      onValueChange={setMediaType}
                    >
                      <SelectTrigger className="bg-white/10 border-white/10 text-white">
                        <SelectValue placeholder={t('search.selectMediaType', 'Select media type')} />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/10">
                        <SelectItem value="all" className="text-white">{t('search.options.all', 'All')}</SelectItem>
                        <SelectItem value="movie" className="text-white">{t('search.options.movies', 'Movies')}</SelectItem>
                        <SelectItem value="tv" className="text-white">{t('search.options.tvShows', 'TV Shows')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-white/70 mb-2">{t('search.sortBy', 'Sort By')}</label>
                    <Select 
                      value={sortBy} 
                      onValueChange={setSortBy}
                    >
                      <SelectTrigger className="bg-white/10 border-white/10 text-white">
                        <SelectValue placeholder={t('search.sortBy', 'Sort By')} />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-white/10">
                        <SelectItem value="popularity" className="text-white">{t('search.sortOptions.popularity', 'Popularity')}</SelectItem>
                        <SelectItem value="rating" className="text-white">{t('search.sortOptions.rating', 'Rating')}</SelectItem>
                        <SelectItem value="newest" className="text-white">{t('search.sortOptions.newest', 'Newest')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>

        {!searchParams.get('q') && searchHistory.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{t('search.searchHistory', 'Search History')}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearchHistory}
                className="text-white/70 hover:text-white"
              >
                {t('search.clearHistory', 'Clear History')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-white hover:bg-white/10"
                  onClick={() => {
                    setQuery(term);
                    navigate(`/search?q=${encodeURIComponent(term)}`);
                  }}
                >
                  <SearchIcon className="h-4 w-4 mr-2" />
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-white">{t('search.loadingResults', 'Loading results...')}</div>
          </div>
        ) : (
          <>
            {searchParams.get('q') ? (
              <div>
                <MediaGrid 
                  media={displayedResults} 
                  title={t('search.resultsFor', { query: searchParams.get('q') || '' })}
                />
                
                {/* Actors Search Results */}
                <div className="mt-8">
                  <ActorSearchResults 
                    query={searchParams.get('q') || ''} 
                    limit={12} 
                  />
                </div>
                
                {hasMoreResults && (
                  <div className="flex justify-center my-8">
                    <Button 
                      onClick={handleShowMore} 
                      variant="outline" 
                      className="border-white/10 text-white hover:bg-white/10"
                    >
                      Show More <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {allResults.length > 0 && (
                  <Pagination className="my-8">
                    <PaginationContent>
                      <PaginationItem>
                        <div className="text-white/70 text-sm">
                          {t('search.showingCount', { displayed: displayedResults.length, total: allResults.length })}
                        </div>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
                
                {allResults.length > 0 && (
                  <Accordion type="single" collapsible className="mb-8">
                    <AccordionItem value="search-tips" className="border-white/10">
                      <AccordionTrigger className="text-white hover:text-accent">
                        {t('search.tips.title', 'Search Tips')}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70">
                        <ul className="list-disc list-inside space-y-2">
                          <li>{t('search.tips.useAdvanced', 'Use the advanced search options to filter by media type and sort results')}</li>
                          <li>{t('search.tips.pressSlash', 'Press the "/" key anywhere on the site to quickly focus the search bar')}</li>
                          <li>{t('search.tips.specificTerms', 'Try using more specific terms for better results')}</li>
                          <li>{t('search.tips.useSuggestions', 'Use the search suggestions that appear as you type')}</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-white/70">
                <p>{t('search.empty.prompt', 'Enter a search term to find movies and TV shows')}</p>
                <p className="mt-2 text-sm">{t('search.empty.proTip', 'Pro tip: Press "/" anywhere to quickly search')}</p>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;
