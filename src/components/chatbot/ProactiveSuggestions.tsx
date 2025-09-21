import React, { useState, useEffect } from 'react';
import { useChatbot } from '@/contexts/chatbot-context';
import { useUserProfile } from '@/contexts/user-profile-context';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

/**
 * ProactiveSuggestions component that provides contextual suggestions
 * based on time of day, viewing history, etc.
 */
const ProactiveSuggestions: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const { sendMessage, isOpen } = useChatbot();
  const { profile } = useUserProfile();

  // Generate a contextual suggestion based on time and profile
  const generateSuggestion = (): string => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = day === 0 || day === 6;
    
    // Suggestions based on time of day
    if (hour < 12) {
      return isWeekend ? 
        t('chatbot.suggestions.breakfastWeekend', 'Looking for something to watch with breakfast?') : 
        t('chatbot.suggestions.breakfastWorkday', 'Need a quick show recommendation before work?');
    } else if (hour < 17) {
      return t('chatbot.suggestions.afternoon', 'How about a recommendation for this afternoon?');
    } else if (hour < 21) {
      return isWeekend ?
        t('chatbot.suggestions.eveningWeekend', 'Looking for a movie for weekend night?') :
        t('chatbot.suggestions.eveningWorkday', 'Need something to unwind after work?');
    } else {
      return t('chatbot.suggestions.lateNight', 'Late night viewing recommendations?');
    }
  };

  // Only show proactive suggestions when the chat is closed
  // and randomly (not too frequently)
  useEffect(() => {
    if (isOpen) {
      setVisible(false);
      return;
    }

    // Determine if we should show a suggestion (randomly)
    const checkProactiveSuggestion = () => {
      // Only show suggestions with a 30% probability to avoid being annoying
      if (Math.random() < 0.3) {
        setSuggestion(generateSuggestion());
        setVisible(true);
        
        // Auto-hide after 15 seconds
        setTimeout(() => {
          setVisible(false);
        }, 15000);
      }
    };

    // Initial check
    const timer = setTimeout(checkProactiveSuggestion, 10000);
    
    // Check again periodically
    const interval = setInterval(checkProactiveSuggestion, 60000 * 30); // every 30 minutes
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isOpen]);

  const handleSuggestionClick = () => {
    const message = suggestion.replace(/\?$/, '');
    sendMessage(message);
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 z-40"
        >
          <Card className="shadow-lg w-[250px]">
            <CardContent className="p-3 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-primary">
                  <Sparkles size={14} className="mr-1" />
                  <span className="text-xs font-medium">{t('chatbot.suggestions.title', 'Suggestion')}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-5 w-5 p-0 text-muted-foreground hover:text-foreground"
                  onClick={handleDismiss}
                >
                  <X size={12} />
                </Button>
              </div>
              
              <p className="text-sm mb-3">{suggestion}</p>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full text-xs"
                onClick={handleSuggestionClick}
              >
                {t('chatbot.suggestions.getRecommendations', 'Get Recommendations')}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProactiveSuggestions;
