import React, { useRef, useEffect, useState } from 'react';
import './chatbot-mobile.css';
import { Send, Search, X } from 'lucide-react';
import { triggerHapticFeedback } from '@/utils/haptic-feedback';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useChatbot } from '@/contexts/chatbot-context';
import { useUserProfile } from '@/contexts/user-profile-context';
import { nlpService } from '@/utils/services/nlp-service';
import { streamingPlatformService, type StreamingAvailability } from '@/utils/services/streaming-platform';
import { Media } from '@/utils/types';
import ChatMessage from './ChatMessage';
import RecommendationCard from './RecommendationCard';
import QuickReplySuggestions from './QuickReplySuggestions';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface MediaWithAvailability extends Media {
  availability?: StreamingAvailability[];
}

const ChatbotWindow: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isOpen, messages, isLoading, sendMessage, searchForMedia, closeChatbot } = useChatbot();
  const { profile, getRecommendations, analyzeUserFeedback, getPersonalizedScore } = useUserProfile();
  const [input, setInput] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<MediaWithAvailability[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Mobile-specific state
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [isPartialView, setIsPartialView] = useState(false);
  const isMobile = windowSize.width < 768;

  // Enhanced message history management
  const enhancedMessages = messages.map((msg, index) => ({ ...msg, contextIndex: index }));

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    // Provide haptic feedback on submit
    triggerHapticFeedback(20);

    setIsAnalyzing(true);
    try {
      // Analyze user input for better understanding
      const analysis = await nlpService.analyzeInput(trimmedInput);
      
      if (isSearchMode) {
        // Enhanced search with NLP analysis
        const searchResults = await searchForMedia(trimmedInput);
        
        // Filter results based on streaming availability
        if (profile) {
          const availableResults = await streamingPlatformService.filterAvailableContent(
            searchResults,
            profile.streamingServices
          );
          setRecommendations(availableResults);
        }
      } else {
        // Get personalized recommendations based on the query
        const userRecommendations = await getRecommendations(5);
        setRecommendations(userRecommendations);
        
        // Send message with enhanced context
        await sendMessage(trimmedInput, {
          nlpAnalysis: analysis,
          recommendations: userRecommendations
        });
      }
      
      setInput('');
    } catch (error) {
      console.error('Error processing input:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Load streaming availability for recommendations
  useEffect(() => {
    const loadAvailability = async () => {
      if (!recommendations.length || !profile) return;
      
      setLoadingAvailability(true);
      try {
        const updatedRecommendations = await Promise.all(
          recommendations.map(async (media) => {
            const availability = await streamingPlatformService.getStreamingAvailability(media.id);
            return { ...media, availability };
          })
        );
        setRecommendations(updatedRecommendations);
      } catch (error) {
        console.error('Error loading streaming availability:', error);
      } finally {
        setLoadingAvailability(false);
      }
    };

    loadAvailability();
  }, [recommendations.map(r => r.id).join(','), profile]);

  // Handle rating a recommendation
  const handleRate = async (media: Media, rating: number) => {
    if (!profile) return;
    
    await analyzeUserFeedback(
      `Rating ${rating > 0 ? 'positive' : 'negative'} for ${media.title || media.name}`,
      media.id,
      rating > 0 ? 5 : 1
    );
  };

  const toggleSearchMode = () => {
    setIsSearchMode(!isSearchMode);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Switch to partial view when keyboard appears on mobile
  useEffect(() => {
    const checkKeyboard = () => {
      // Rough approximation of keyboard detection
      // If visible height is significantly less than total height, keyboard is likely open
      const visibleHeight = window.innerHeight;
      if (isMobile && visibleHeight < windowSize.height * 0.8) {
        setIsPartialView(true);
      } else {
        setIsPartialView(false);
      }
    };
    
    window.addEventListener('resize', checkKeyboard);
    return () => window.removeEventListener('resize', checkKeyboard);
  }, [isMobile, windowSize.height]);
  
  // Toggle partial view manually
  const togglePartialView = () => {
    setIsPartialView(!isPartialView);
  };
  
  if (!isOpen) return null;
  
  // Extract the class name logic into a plain function to avoid hook issues
  function getCardClassNames() {
    return cn(
      // Base positioning and z-index
      "fixed z-50",
      
      // Mobile full-screen or adaptive sizing
      isMobile ? (
        isPartialView 
          ? "bottom-0 left-0 right-0 h-[60%] rounded-b-none rounded-t-xl" 
          : "bottom-0 left-0 right-0 top-0 rounded-none"
      ) : "bottom-20 right-4 w-[380px] h-[520px]",
      
      // Shared styles
      "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "shadow-2xl border border-border/40",
      "transition-all duration-200 ease-in-out",
      "flex flex-col"
    );
  }

  return (
    <Card className={getCardClassNames()}>
      <CardHeader className="pb-2 border-b border-border/10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t('chatbot.window.title', 'CineMate')}
          </CardTitle>
          <div className="flex space-x-1">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePartialView}
                className="hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {isPartialView ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                )}
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                triggerHapticFeedback(25);
                closeChatbot();
              }}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={cn(
        "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent",
        isMobile ? "p-3" : "p-4"
      )}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-2">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-primary">{t('chatbot.window.welcome', 'Welcome to CineMate! 🎬')}</p>
              <p className="text-sm text-muted-foreground">{t('chatbot.window.description', 'I can recommend movies and TV shows tailored to your tastes, or help you discover something new.')}</p>
            </div>
            
            <div className="w-full space-y-2">
              <p className="text-sm font-medium">{t('chatbot.window.whatICanHelp', 'What I can help you with:')}</p>
              <ul className="text-left text-sm list-none space-y-2">
                {[
                  t('chatbot.window.features.moodRecommendations', 'Get instant recommendations based on your mood'),
                  t('chatbot.window.features.searchTrending', 'Search trending, top-rated, or new releases'),
                  t('chatbot.window.features.addWatchlist', 'Add movies to your watchlist for later'),
                  t('chatbot.window.features.trackHistory', 'Track your watch history'),
                  t('chatbot.window.features.advancedSearch', 'Advanced search by genre, rating, or year')
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">{t('chatbot.window.trySaying', 'Try saying:')}</p>
              <div className="space-y-1.5">
                {[
                  t('chatbot.window.examples.comedy', 'Suggest a feel-good comedy for the weekend'),
                  t('chatbot.window.examples.sciFi', 'Show me trending sci-fi movies'),
                  t('chatbot.window.examples.watchlist', 'Add Inception to my watchlist')
                ].map((text, i) => (
                  <p key={i} className="text-xs italic text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-lg">
                    "{text}"
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-4">
                <ChatMessage message={message} />
                {message.mediaItems && (
                  <div className="grid gap-4">
                    {message.mediaItems.map((media) => {
                      const recommendation = recommendations.find(r => r.id === media.id);
                      return (
                        <RecommendationCard
                          key={media.id}
                          media={media}
                          availability={recommendation?.availability}
                          onRate={(rating) => handleRate(media, rating)}
                          personalizedScore={getPersonalizedScore(media)}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className={cn(
        "border-t border-border/10", 
        isMobile ? "p-2 pb-4" : "p-4"
      )}>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <div className="flex space-x-1">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => {
                triggerHapticFeedback(15);
                toggleSearchMode();
              }}
              className={cn(
                "transition-colors duration-200",
                isSearchMode ? "text-primary bg-primary/10" : "hover:bg-primary/10",
                isMobile ? "w-8 h-8" : ""
              )}
            >
              <Search className={cn("h-4 w-4", isMobile ? "h-3.5 w-3.5" : "")} />
            </Button>
            
            {/* Voice input button for mobile */}
            {isMobile && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "transition-colors duration-200 w-8 h-8",
                  isAnalyzing && "text-red-500"
                )}
                onClick={() => {
                  // Provide haptic feedback when activating microphone
                  triggerHapticFeedback(20);
                  // Implement actual voice recognition
                  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                    setIsAnalyzing(true);
                    
                    // Create speech recognition instance
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    const recognition = new SpeechRecognition();
                    
                    recognition.lang = 'en-US';
                    recognition.interimResults = false;
                    recognition.maxAlternatives = 1;
                    
                    recognition.onresult = (event) => {
                      const speechResult = event.results[0][0].transcript;
                      setInput(speechResult);
                      setIsAnalyzing(false);
                    };
                    
                    recognition.onerror = (event) => {
                      console.error('Speech recognition error:', event.error);
                      setIsAnalyzing(false);
                    };
                    
                    recognition.start();
                  } else {
                    // Fallback for browsers without speech recognition
                    alert('Speech recognition is not supported in your browser.');
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </Button>
            )}
          </div>
          
          <Input
            ref={inputRef}
            placeholder={isSearchMode ? t('chatbot.suggestions.searchPlaceholder', 'Search for movies or shows...') : t('chatbot.suggestions.askPlaceholder', 'Ask for recommendations...')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={cn(
              "flex-1 transition-all duration-200",
              "bg-muted/40 border-muted-foreground/20",
              "focus:ring-1 focus:ring-primary/30 focus:border-primary/30",
              "placeholder:text-muted-foreground/50",
              isMobile && "text-sm h-9"
            )}
            disabled={isLoading || isAnalyzing}
          />
          
          {isMobile && (
            <QuickReplySuggestions
              suggestions={[
                t('chatbot.suggestions.quickReplies.comedy', 'Comedy'),
                t('chatbot.suggestions.quickReplies.sciFi', 'Sci-Fi'),
                t('chatbot.suggestions.quickReplies.action', 'Action'),
                t('chatbot.suggestions.quickReplies.drama', 'Drama'),
                t('chatbot.suggestions.quickReplies.randomSuggestion', 'Random Suggestion')
              ]}
              onSelectSuggestion={(suggestion) => setInput(suggestion)}
              className="absolute -top-10 left-0 right-0"
            />
          )}
          
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || isAnalyzing || !input.trim()}
            className={cn(
              "bg-primary/90 hover:bg-primary transition-colors",
              "disabled:bg-muted disabled:cursor-not-allowed",
              isMobile ? "w-9 h-9" : ""
            )}
          >
            {isLoading || isAnalyzing || loadingAvailability ?
              <Spinner size="sm" /> :
              <Send className={cn("h-4 w-4", isMobile ? "h-3.5 w-3.5" : "")} />
            }
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatbotWindow;
