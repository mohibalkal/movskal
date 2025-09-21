import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MinimizeIcon, MaximizeIcon, RefreshCcw, WifiOff, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTranslation } from 'react-i18next';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp?: number;
}

interface ServiceWorkerEvent {
  type: string;
  timestamp: number;
  details?: string;
}

interface ServiceWorkerMetrics {
  cacheSize: number;
  cacheHits: number;
  cacheMisses: number;
  networkRequests: number;
}

export function ServiceWorkerDebugPanel() {
  const { t } = useTranslation();
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [controllerState, setControllerState] = useState<string>('');
  const [webVitals, setWebVitals] = useState<WebVitalMetric[]>([]);
  const [bypassEnabled, setBypassEnabled] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [events, setEvents] = useState<ServiceWorkerEvent[]>([]);
  const [metrics, setMetrics] = useState<ServiceWorkerMetrics>({
    cacheSize: 0,
    cacheHits: 0,
    cacheMisses: 0,
    networkRequests: 0
  });
  const [networkCondition, setNetworkCondition] = useState('online');
  const [logLevel, setLogLevel] = useState('info');

  const addEvent = useCallback((type: string, details?: string) => {
    setEvents(prevEvents => [
      { type, timestamp: Date.now(), details },
      ...prevEvents.slice(0, 99)
    ]);
  }, []);

  const checkRegistration = useCallback(async () => {
    try {
      const reg = await navigator.serviceWorker.getRegistration();
      setRegistration(reg || null);
      setWaiting(!!reg?.waiting);
      setControllerState(navigator.serviceWorker.controller ? 'active' : 'none');
      
      if (reg?.active) {
        reg.active.postMessage({ type: 'GET_BYPASS_STATUS' });
        reg.active.postMessage({ type: 'GET_METRICS' });
      }

      addEvent('Registration', 'Service worker registration status checked');
    } catch (error) {
      console.error('Failed to get service worker registration:', error);
      addEvent('Error', 'Failed to get service worker registration');
    }
  }, [addEvent]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'BYPASS_STATUS') {
        setBypassEnabled(event.data.active);
        addEvent('Bypass', `Bypass ${event.data.active ? 'enabled' : 'disabled'}`);
      } else if (event.data?.type === 'METRICS_UPDATE') {
        setMetrics(event.data.metrics);
        addEvent('Metrics', 'Performance metrics updated');
      }
    };

    const handleNetworkChange = () => {
      const status = navigator.onLine ? 'online' : 'offline';
      setNetworkCondition(status);
      addEvent('Network', `Network status changed to ${status}`);
    };

    const handleStateChange = () => {
      checkRegistration();
      addEvent('State', 'Service worker state changed');
    };

    const handleControllerChange = () => {
      setControllerState(navigator.serviceWorker.controller ? 'active' : 'none');
      addEvent('Controller', 'Service worker controller changed');
    };

    checkRegistration();

    if (registration) {
      registration.addEventListener('statechange', handleStateChange);
    }

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    navigator.serviceWorker.addEventListener('message', handleMessage);
    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      if (registration) {
        registration.removeEventListener('statechange', handleStateChange);
      }
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
      navigator.serviceWorker.removeEventListener('message', handleMessage);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, [registration, checkRegistration, addEvent]);

  const handleSkipWaiting = useCallback(() => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      addEvent('Action', 'Skip waiting triggered');
    }
  }, [registration, addEvent]);

  const handleBypassToggle = useCallback(() => {
    if (registration?.active) {
      registration.active.postMessage({
        type: 'TOGGLE_BYPASS',
        enable: !bypassEnabled,
        duration: 300000
      });
    }
  }, [registration, bypassEnabled]);

  const handleNetworkSimulation = useCallback((condition: string) => {
    if (registration?.active) {
      registration.active.postMessage({
        type: 'SIMULATE_NETWORK',
        condition
      });
      setNetworkCondition(condition);
      addEvent('Network', `Network condition simulated: ${condition}`);
    }
  }, [registration, addEvent]);

  // Return early if not in development environment or no registration
  if (!import.meta.env.DEV || !registration) {
    return null;
  }

  if (isMinimized) {
    return (
      <Button
        className="fixed bottom-4 right-4 p-2"
        variant="outline"
        size="icon"
        onClick={() => setIsMinimized(false)}
        title="Expand Debug Panel"
      >
        <MaximizeIcon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 p-4 space-y-4 w-96 max-h-[80vh] overflow-auto z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{t('debug.serviceWorker.title')}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={checkRegistration}
            title={t('debug.serviceWorker.refreshStatus')}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(true)}
            title={t('debug.serviceWorker.minimizePanel')}
          >
            <MinimizeIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="status">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status">{t('debug.serviceWorker.status')}</TabsTrigger>
          <TabsTrigger value="events">{t('debug.serviceWorker.events')}</TabsTrigger>
          <TabsTrigger value="perf">{t('debug.serviceWorker.performance')}</TabsTrigger>
          <TabsTrigger value="network">{t('debug.serviceWorker.network')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('debug.serviceWorker.controller')}:</span>
              <span className="text-sm font-medium">{controllerState}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">{t('debug.serviceWorker.iframeProxyBypass')}:</span>
              <Switch
                checked={bypassEnabled}
                onCheckedChange={handleBypassToggle}
                aria-label={t('debug.serviceWorker.toggleIframeProxyBypass')}
              />
            </div>

            {registration.active && (
              <div className="flex items-center justify-between">
                <span className="text-sm">{t('debug.serviceWorker.activeState')}:</span>
                <span className="text-sm font-medium">{registration.active.state}</span>
              </div>
            )}
            
            {registration.waiting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('debug.serviceWorker.waitingState')}:</span>
                  <span className="text-sm font-medium">{registration.waiting.state}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSkipWaiting}
                  className="w-full"
                >
                  {t('debug.serviceWorker.applyUpdate')}
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm">{t('debug.serviceWorker.logLevel')}:</span>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">{t('debug.serviceWorker.debug')}</SelectItem>
                  <SelectItem value="info">{t('debug.serviceWorker.info')}</SelectItem>
                  <SelectItem value="warn">{t('debug.serviceWorker.warn')}</SelectItem>
                  <SelectItem value="error">{t('debug.serviceWorker.error')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {events.map((event, index) => (
              <div key={index} className="text-sm border-l-2 border-accent pl-2">
                <div className="flex justify-between">
                  <span className="font-medium">{event.type}</span>
                  <span className="text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {event.details && (
                  <p className="text-muted-foreground">{event.details}</p>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="perf" className="space-y-4">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-sm font-medium">{t('debug.serviceWorker.cacheHits')}</span>
                <div className="text-2xl font-bold">{metrics.cacheHits}</div>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium">{t('debug.serviceWorker.cacheMisses')}</span>
                <div className="text-2xl font-bold">{metrics.cacheMisses}</div>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium">{t('debug.serviceWorker.networkRequests')}</span>
                <div className="text-2xl font-bold">{metrics.networkRequests}</div>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium">{t('debug.serviceWorker.cacheSize')}</span>
                <div className="text-2xl font-bold">{(metrics.cacheSize / 1024 / 1024).toFixed(2)} MB</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Network Status:</span>
              <div className="flex items-center gap-2">
                {navigator.onLine ? (
                  <Activity className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm font-medium capitalize">{networkCondition}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Select value={networkCondition} onValueChange={handleNetworkSimulation}>
                <SelectTrigger>
                  <SelectValue placeholder="Simulate Network Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online (Normal)</SelectItem>
                  <SelectItem value="slow-3g">Slow 3G</SelectItem>
                  <SelectItem value="fast-3g">Fast 3G</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
