
import { useParams } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import VideoSourceSelector from '@/components/player/VideoSourceSelector';
import EpisodeNavigation from '@/components/player/EpisodeNavigation';
import MediaActions from '@/components/player/MediaActions';
import { useMediaPlayer } from '@/hooks/use-media-player';
import { videoSources } from '@/utils/video-sources';
import { useAuth } from '@/hooks';
import { useTranslation } from 'react-i18next';

const Player = () => {
  const { id, season, episode, type } = useParams<{ id: string; season?: string; episode?: string; type: string }>();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  const {
    title,
    mediaType,
    mediaDetails,
    episodes,
    currentEpisodeIndex,
    isLoading,
    isPlayerLoaded,
    iframeUrl,
    // ...existing code...
    // ...existing code...
    selectedSource,
    isFavorite,
    isInMyWatchlist,
    handleSourceChange,
    goToDetails,
    goToNextEpisode,
    goToPreviousEpisode,
    toggleFavorite,
    toggleWatchlist,
    handlePlayerLoaded,
    handlePlayerError,
    goBack
  } = useMediaPlayer(id, season, episode, type);

  const posterUrl = mediaDetails ? 
    `https://image.tmdb.org/t/p/w1280${(mediaDetails as any).backdrop_path}` 
    : undefined;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">
        <VideoPlayer
          title={title}
          poster={posterUrl}
          iframeUrl={iframeUrl}
          onLoaded={handlePlayerLoaded}
          onError={handlePlayerError}
          isLoading={!isPlayerLoaded}
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          {mediaType === 'tv' && episodes.length > 0 && (
            <EpisodeNavigation 
              episodes={episodes}
              currentEpisodeIndex={currentEpisodeIndex}
              onPreviousEpisode={goToPreviousEpisode}
              onNextEpisode={goToNextEpisode}
            />
          )}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">{t('player.videoSources', 'Video Sources')}</h3>
                <p className="text-sm text-white/60">{t('player.selectSource', 'Select your preferred streaming source')}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                onClick={goToDetails}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t('player.viewDetails', 'View Details')}
              </Button>
            </div>
            <VideoSourceSelector 
              videoSources={videoSources}
              selectedSource={selectedSource}
              onSourceChange={handleSourceChange}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Player;
