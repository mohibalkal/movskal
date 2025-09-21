import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DownloadLink {
  resolution: string;
  url: string;
  text: string;
}

interface DownloadResponse {
  status: string;
  tmdb_id: string;
  download_links: DownloadLink[];
  error: string | null;
}

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaId: string;
  mediaType: 'movie' | 'tv';
  mediaTitle: string;
  seasons?: Array<{ season_number: number; name: string }>;
  episodesBySeason?: Record<number, Array<{ episode_number: number; name: string }>>;
  onSeasonChange?: (seasonNumber: number) => Promise<Array<{ episode_number: number; name: string }>>;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  mediaId,
  mediaType,
  mediaTitle,
  seasons = [],
  episodesBySeason = {},
  onSeasonChange
}) => {
  const { t } = useTranslation();
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<DownloadLink[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Local state to manage episodes for each season
  const [localEpisodesBySeason, setLocalEpisodesBySeason] = useState<Record<number, Array<{ episode_number: number; name: string }>>>(episodesBySeason);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);

  // Reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSeason(1);
      setSelectedEpisode(1);
      setDownloadLinks([]);
      setError(null);
      setLocalEpisodesBySeason(episodesBySeason); // Reset to initial state
    }
  }, [isOpen, episodesBySeason]);

  // Update episode when season changes
  useEffect(() => {
    const updateEpisodesForSeason = async () => {
      if (mediaType === 'tv' && onSeasonChange && selectedSeason > 0) {
        try {
          setIsLoadingEpisodes(true);
          const newEpisodes = await onSeasonChange(selectedSeason);
          
          // Update local episodes state
          setLocalEpisodesBySeason(prev => ({
            ...prev,
            [selectedSeason]: newEpisodes
          }));
          
          // Select first episode if available
          const firstEpisode = newEpisodes[0]?.episode_number;
          if (firstEpisode) {
            setSelectedEpisode(firstEpisode);
          }
        } catch (error) {
          console.error('Error fetching episodes for season:', error);
        } finally {
          setIsLoadingEpisodes(false);
        }
      }
    };

    // Only run when season actually changes, not on every render
    if (selectedSeason > 0) {
      updateEpisodesForSeason();
    }
  }, [selectedSeason, mediaType, onSeasonChange]); // Removed localEpisodesBySeason from dependencies

    const fetchDownloadLinks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setDownloadLinks([]);

    try {
      let url: string;
      if (mediaType === 'movie') {
        url = `https://dl.vidzee.wtf/download/movie/v5/${mediaId}`;
      } else {
        // For TV shows, the path format is /tv/v5/{id}/{season}/{episode}
        url = `https://dl.vidzee.wtf/download/tv/v5/${mediaId}/${selectedSeason}/${selectedEpisode}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: DownloadResponse = await response.json();
       
      if (data.status === 'success' && data.download_links) {
        setDownloadLinks(data.download_links);
      } else {
        setError(data.error || 'No download links available');
      }
    } catch (err) {
      console.error('Error fetching download links:', err);
      setError('Failed to fetch download links. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [mediaId, mediaType, selectedSeason, selectedEpisode]);

  const handleDownload = (url: string, resolution: string) => {
    // Open download link in new tab
    window.open(url, '_blank');
  };

  const getEpisodeName = (episodeNumber: number) => {
    const episode = episodesBySeason[selectedSeason]?.find(ep => ep.episode_number === episodeNumber);
    return episode?.name || `Episode ${episodeNumber}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            {t('media.downloadOptions', 'Download Options')} — {mediaTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Season Selection - Only for TV Shows */}
          {mediaType === 'tv' && seasons.length > 0 && (
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">
                {t('tv.season', 'Season')}
              </label>
              <Select value={selectedSeason.toString()} onValueChange={(value) => setSelectedSeason(Number(value))}>
                <SelectTrigger className="bg-[#23272f] border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#23272f] border-white/10">
                  {seasons.map((season) => (
                    <SelectItem key={season.season_number} value={season.season_number.toString()}>
                      {season.name || `${t('tv.season', 'Season')} ${season.season_number}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Episode Selection - Only for TV Shows */}
          {mediaType === 'tv' && (
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">
                {t('tv.episode', 'Episode')}
              </label>
              <Select 
                value={selectedEpisode.toString()} 
                onValueChange={(value) => setSelectedEpisode(Number(value))}
                disabled={isLoadingEpisodes}
              >
                <SelectTrigger className="bg-[#23272f] border-white/10 text-white">
                  <SelectValue placeholder={isLoadingEpisodes ? t('media.loadingEpisodes', 'Loading episodes...') : t('media.selectEpisode', 'Select Episode')} />
                </SelectTrigger>
                <SelectContent className="bg-[#23272f] border-white/10">
                  {isLoadingEpisodes ? (
                    <SelectItem value="loading" disabled>
                      {t('media.loadingEpisodes', 'Loading episodes...')}
                    </SelectItem>
                                     ) : localEpisodesBySeason[selectedSeason] ? (
                     localEpisodesBySeason[selectedSeason].map((episode) => (
                                               <SelectItem key={episode.episode_number} value={episode.episode_number.toString()}>
                          {episode.name ? `${t('tv.episode', 'Episode')} ${episode.episode_number} - ${episode.name}` : `${t('tv.episode', 'Episode')} ${episode.episode_number}`}
                        </SelectItem>
                     ))
                  ) : (
                    <SelectItem value="no-episodes" disabled>
                      {t('media.noEpisodesAvailable', 'No episodes available')}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Fetch Downloads Button */}
          <Button 
            onClick={fetchDownloadLinks}
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/80 text-white py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('media.fetchingDownloads', 'Fetching Downloads...')}
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                {t('media.fetchDownloads', 'Fetch Downloads')}
              </>
            )}
          </Button>

          {/* Error Display */}
          {error && (
            <div className="text-red-400 text-center p-3 bg-red-400/10 rounded-lg">
              {error}
            </div>
          )}

          {/* Download Links */}
          {downloadLinks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-white font-medium text-lg">
                {t('media.availableDownloads', 'Available Downloads')}
                {mediaType === 'tv' && (
                  <span className="text-white/60 text-sm ml-2">
                    (S{selectedSeason} E{selectedEpisode})
                  </span>
                )}
              </h3>
              
              <div className="grid gap-3">
                {downloadLinks.map((link, index) => (
                  <Button
                    key={index}
                    onClick={() => handleDownload(link.url, link.resolution)}
                    variant="outline"
                    className="w-full justify-between bg-[#23272f] border-white/10 text-white hover:bg-white/10"
                  >
                    <span className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      {link.text}
                    </span>
                    <span className="text-white/60 text-sm">{link.resolution}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
