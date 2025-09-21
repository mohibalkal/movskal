import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';

/**
 * DirectionManager component
 * 
 * This component ensures consistent text direction management across the app.
 * It prevents conflicts between different parts of the app trying to set direction.
 */
export const DirectionManager: React.FC = () => {
  const { currentLanguage, textDirection } = useLanguage();
  const lastAppliedDirection = useRef<string>('');

  useEffect(() => {
    // Always apply direction when language changes
    const applyDirection = () => {
      const html = document.documentElement;
      const body = document.body;

      // Clean up any existing direction classes
      html.classList.remove('rtl', 'ltr');
      body.classList.remove('rtl', 'ltr');

      // Apply new direction
      html.setAttribute('dir', textDirection);
      html.setAttribute('lang', currentLanguage);

      if (textDirection === 'rtl') {
        html.classList.add('rtl');
        body.classList.add('rtl');
      } else {
        html.classList.add('ltr');
        body.classList.add('ltr');
      }

      lastAppliedDirection.current = textDirection;

      console.log(`DirectionManager: Applied ${textDirection} direction for language ${currentLanguage}`);
    };

    // Apply immediately
    applyDirection();
    
    // Also apply after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(applyDirection, 100);
    
    // Apply again after a longer delay to ensure all components are rendered
    const timeoutId2 = setTimeout(applyDirection, 500);
    
    // Apply one more time to ensure all dynamic content is rendered
    const timeoutId3 = setTimeout(applyDirection, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
    };
  }, [textDirection, currentLanguage]);

  // Initial setup
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Ensure initial state is correct
    if (!html.getAttribute('dir')) {
      html.setAttribute('dir', textDirection);
      html.setAttribute('lang', currentLanguage);
      
      if (textDirection === 'rtl') {
        html.classList.add('rtl');
        body.classList.add('rtl');
      } else {
        html.classList.add('ltr');
        body.classList.add('ltr');
      }
      
      lastAppliedDirection.current = textDirection;
      console.log(`DirectionManager: Initial setup - Applied ${textDirection} direction for language ${currentLanguage}`);
    }
  }, []); // Only run once on mount

  // Monitor for any external changes and correct them
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          const html = document.documentElement;
          const currentDir = html.getAttribute('dir');
          
          // If direction was changed externally and doesn't match our expected direction
          if (currentDir !== textDirection) {
            console.warn(`DirectionManager: Detected external direction change from ${currentDir} to ${textDirection}, correcting...`);
            
            // Re-apply our direction
            const body = document.body;
            html.setAttribute('dir', textDirection);
            html.classList.remove('rtl', 'ltr');
            body.classList.remove('rtl', 'ltr');
            
            if (textDirection === 'rtl') {
              html.classList.add('rtl');
              body.classList.add('rtl');
            } else {
              html.classList.add('ltr');
              body.classList.add('ltr');
            }
          }
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });

    return () => {
      observer.disconnect();
    };
  }, [textDirection]);

  // This component doesn't render anything
  return null;
};

export default DirectionManager;
