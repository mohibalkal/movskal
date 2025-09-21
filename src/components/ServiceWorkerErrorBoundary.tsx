
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  snoozedUntil: number | null;
}

class ServiceWorkerErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    snoozedUntil: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Only show this boundary for actual service-worker related failures.
    const msg = (error?.message || '').toLowerCase();
    const isSwError = msg.includes('service worker') || msg.includes('workbox') || msg.includes('navigator.serviceworker');
    if (isSwError) {
      return { hasError: true, error, errorInfo: null, snoozedUntil: null };
    }
    // For non-SW errors, do not hijack the UI (let other boundaries/console handle them)
    return { hasError: false, error: null, errorInfo: null, snoozedUntil: null };
  }

  public async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Service Worker error:', error, errorInfo);
    this.setState({ errorInfo });
    // Log error to analytics
    await trackEvent({
      name: 'client_error',
      params: {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        boundary: 'ServiceWorkerErrorBoundary',
      },
    });
  }

  private handleRetry = () => {
    // Reset error state and attempt to render again
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    // Attempt to re-initialize service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
        
        // Reload the page after unregistering
        window.location.reload();
      });
    }
  };

  private handleDismiss = (hours = 12) => {
    const until = Date.now() + hours * 60 * 60 * 1000;
    try {
      localStorage.setItem('ls-sw-error-snooze-until', String(until));
    } catch {}
    this.setState({ hasError: false, error: null, errorInfo: null, snoozedUntil: until });
  };

  componentDidMount(): void {
    try {
      const value = localStorage.getItem('ls-sw-error-snooze-until');
      if (value) {
        const until = Number(value);
        if (!Number.isNaN(until)) {
          this.setState({ snoozedUntil: until });
        }
      }
    } catch {}
  }

  public render() {
    const { t } = this.props;
    
    const snoozed = this.state.snoozedUntil && Date.now() < this.state.snoozedUntil;
    if (this.state.hasError && !snoozed) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>{t('errors.serviceWorker.title', 'Service Worker Error')}</AlertTitle>
          <AlertDescription>
            <p className="mb-2">{t('errors.serviceWorker.description', 'There was a problem with the service worker. Some features may not work properly.')}</p>
            <p className="text-sm mb-4">{this.state.error?.message || t('errors.serviceWorker.unknownError', 'Unknown error')}</p>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={this.handleRetry}>{t('errors.serviceWorker.retry', 'Retry')}</Button>
              <Button size="sm" variant="outline" onClick={() => this.handleDismiss(12)}>{t('errors.serviceWorker.dismiss', 'Dismiss')}</Button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export const ServiceWorkerErrorBoundary = withTranslation()(ServiceWorkerErrorBoundaryClass);
