
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CastMember } from '@/utils/types';
import ActorCard from '@/components/ActorCard';

interface TVShowCastProps {
  cast: CastMember[];
}

export const TVShowCast = ({ cast }: TVShowCastProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">{t('media.tabs.cast')}</h2>
      {cast.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {cast.map((member) => (
            <ActorCard
              key={member.id}
              actor={member}
              showCharacter={true}
              size="medium"
            />
          ))}
        </div>
      ) : (
        <div className="text-white/70">{t('media.noCast')}</div>
      )}
    </div>
  );
};

export default TVShowCast;
