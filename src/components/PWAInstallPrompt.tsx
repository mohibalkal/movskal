// Add type for window property
declare global {
  interface Window {
    __deferredPWAInstallPrompt?: BeforeInstallPromptEvent;
  }
}
import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next';


// Consider moving this type to a shared types file if reused elsewhere
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}


const PWAInstallPrompt = ({
  promptTitle,
  promptDescription,
  installButtonLabel,
  installedMessage,
  installStartedMessage,
  installCancelledMessage,
  installFailedMessage,
}: {
  promptTitle?: string;
  promptDescription?: string;
  installButtonLabel?: string;
  installedMessage?: string;
  installStartedMessage?: string;
  installCancelledMessage?: string;
  installFailedMessage?: string;
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // Use translations as defaults if not provided
  const title = promptTitle || t('notifications.pwa.installTitle', 'Install App?');
  const description = promptDescription || t('notifications.pwa.installDescription', 'Install this app for offline access and a better experience.');
  const buttonLabel = installButtonLabel || t('notifications.pwa.installButton', 'Install');
  const installedMsg = installedMessage || t('notifications.pwa.installedMessage', 'The app has been installed successfully!');
  const startedMsg = installStartedMessage || t('notifications.pwa.installStartedMessage', 'The app installation has started.');
  const cancelledMsg = installCancelledMessage || t('notifications.pwa.installCancelledMessage', 'You can install the app later from the menu.');
  const failedMsg = installFailedMessage || t('notifications.pwa.installFailedMessage', 'There was an error installing the app. Please try again.');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(() => {
    // Improve detection: check localStorage and display-mode
    return (
      localStorage.getItem('app-installed') === 'true' ||
      window.matchMedia('(display-mode: standalone)').matches
    );
  });
  // In development, show the card by default if not installed/dismissed
  const isDev = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
  const [promptVisible, setPromptVisible] = useState(() => {
    if (isDev && !localStorage.getItem('app-installed')) {
      return true;
    }
    return false;
  });
  const [cardDismissed, setCardDismissed] = useState(false);

  // Pick up the global deferred prompt if available (fixes timing issues)
  useEffect(() => {
    if (!deferredPrompt && window.__deferredPWAInstallPrompt) {
      setDeferredPrompt(window.__deferredPWAInstallPrompt);
    }
  }, [deferredPrompt]);




  // Prevent multiple toasts
  // Prevent multiple toasts
  const handleInstallClick = useCallback(async () => {
    console.log('[PWAInstallPrompt] Install button clicked', { deferredPrompt });
    if (!deferredPrompt) {
      console.warn('[PWAInstallPrompt] No deferredPrompt available. Install prompt cannot be shown.');
      // Fallback for dev mode: show a message if install prompt is unavailable
      toast({
        title: t('notifications.pwa.installUnavailable'),
        description: t('notifications.pwa.installUnavailableMessage'),
        variant: "destructive"
      });
      return;
    }
    try {
      console.log('[PWAInstallPrompt] Calling deferredPrompt.prompt()');
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log('[PWAInstallPrompt] User choice result:', choiceResult);
      if (choiceResult.outcome === 'accepted') {
        setIsAppInstalled(true);
        localStorage.setItem('app-installed', 'true');
        toast({
          title: t('notifications.pwa.installStarted'),
          description: startedMsg,
        });
      } else {
        toast({
          title: t('notifications.pwa.installCancelled'),
          description: cancelledMsg,
        });
      }
      setDeferredPrompt(null);
      setPromptVisible(false);
    } catch (error) {
      console.error('[PWAInstallPrompt] Error during install:', error);
      toast({
        title: t('notifications.pwa.installFailed'),
        description: failedMsg,
        variant: "destructive"
      });
      setPromptVisible(false);
    }
  }, [deferredPrompt, toast, installStartedMessage, installCancelledMessage, installFailedMessage]);

  // Show the card only if not dismissed
  const showInstallCard = useCallback(() => {
    if (promptVisible || cardDismissed) return;
    setPromptVisible(true);
  }, [promptVisible, cardDismissed]);



  useEffect(() => {
    // Handler for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isAppInstalled) {
        showInstallCard();
      }
    };

    // Handler for appinstalled
    const handleAppInstalled = (e: Event) => {
      setIsAppInstalled(true);
      setDeferredPrompt(null);
      localStorage.setItem('app-installed', 'true');
      toast({
        title: t('notifications.pwa.successfullyInstalled'),
        description: installedMsg,
      });
      setPromptVisible(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // In development, if no deferredPrompt and not installed/dismissed, show the card after a short delay
    if (isDev && !deferredPrompt && !isAppInstalled && !cardDismissed) {
      const timeout = setTimeout(() => {
        setPromptVisible(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast, isAppInstalled, showInstallCard, installedMessage, isDev, deferredPrompt, cardDismissed]);

  // Accessibility: aria-live for prompt
  // Card-style popup UI
  if (isAppInstalled || cardDismissed || !promptVisible) return null;

  return (
    <div className="fixed bottom-20 right-6 z-40 max-w-xs w-full" aria-live="polite">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl p-5 flex flex-col gap-3 animate-fade-in">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-base text-neutral-900 dark:text-white">{title}</span>
          <button
            onClick={() => { setCardDismissed(true); setPromptVisible(false); }}
            className="ml-2 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
            aria-label={t('notifications.pwa.dismissPrompt')}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">{description}</div>
        <Button
          variant="default"
          size="lg"
          onClick={handleInstallClick}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label={buttonLabel}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
