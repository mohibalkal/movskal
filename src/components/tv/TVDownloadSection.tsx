import React, { useState } from 'react';
import { triggerHapticFeedback } from '@/utils/haptic-feedback';
import { Season } from '@/utils/types';
import { useTranslation } from 'react-i18next';

interface TVDownloadSectionProps {
  tvShowName: string;
  seasons: Season[];
  episodesBySeason: Record<number, Array<{ episode_number: number; name: string }>>;
}

export const TVDownloadSection: React.FC<TVDownloadSectionProps> = ({
  tvShowName,
  seasons,
  episodesBySeason,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(seasons[0]?.season_number || 1);
  const [selectedEpisode, setSelectedEpisode] = useState<number>(episodesBySeason[selectedSeason]?.[0]?.episode_number || 1);
  const { t } = useTranslation();

  React.useEffect(() => {
    // When season changes, reset episode to first in that season
    const firstEp = episodesBySeason[selectedSeason]?.[0]?.episode_number;
    if (firstEp) setSelectedEpisode(firstEp);
  }, [selectedSeason, episodesBySeason]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
        <div>
          <label className="block text-white/80 text-sm mb-1">{t('tv.season', 'Season')}</label>
          <select
            className="bg-[#23272f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            value={selectedSeason}
            onChange={e => {
              triggerHapticFeedback(15);
              setSelectedSeason(Number(e.target.value));
            }}
          >
            {seasons.map(season => (
              <option key={season.season_number} value={season.season_number}>
                {season.name || `${t('tv.season', 'Season')} ${season.season_number}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-white/80 text-sm mb-1">{t('tv.episode', 'Episode')}</label>
          <select
            className="bg-[#23272f] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            value={selectedEpisode}
            onChange={e => {
              triggerHapticFeedback(15);
              setSelectedEpisode(Number(e.target.value));
            }}
          >
            {(episodesBySeason[selectedSeason] || []).map(ep => (
              <option key={ep.episode_number} value={ep.episode_number}>
                {ep.name || `${t('tv.episode', 'Episode')} ${ep.episode_number}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-4 py-2 rounded bg-accent text-white hover:bg-accent/90 transition-colors">
          {t('media.tabs.downloads')}
        </button>
      </div>
    </div>
  );
};
