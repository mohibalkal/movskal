import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CastMember } from '@/utils/types';
import { getImageUrl } from '@/utils/services/tmdb';
import ActorTooltip from './ActorTooltip';

interface ActorCardProps {
  actor: CastMember;
  showCharacter?: boolean;
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

export const ActorCard: React.FC<ActorCardProps> = ({ 
  actor, 
  showCharacter = true, 
  size = 'medium',
  showTooltip = true
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/actor/${actor.id}`);
  };

  const sizeClasses = {
    small: 'w-24 h-32',
    medium: 'w-32 h-40',
    large: 'w-40 h-48'
  };

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const cardContent = (
    <div
      className={`${sizeClasses[size]} text-center cursor-pointer group flex-shrink-0`}
      onClick={handleClick}
    >
      {actor.profile_path && getImageUrl(actor.profile_path, 'w342') ? (
        <img
          src={getImageUrl(actor.profile_path, 'w342')}
          alt={actor.name}
          className={`rounded-lg ${sizeClasses[size]} object-cover mx-auto mb-2 transition-transform group-hover:scale-105 shadow-lg`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      <div className={`rounded-lg ${sizeClasses[size]} bg-white/10 flex items-center justify-center mx-auto mb-2 text-white/60 ${textSizeClasses[size]} transition-transform group-hover:scale-105 ${actor.profile_path && getImageUrl(actor.profile_path, 'w342') ? 'hidden' : ''}`}>
        {t('media.noImage')}
      </div>
      <p className={`text-white/90 font-medium truncate max-w-full group-hover:text-white transition-colors ${textSizeClasses[size]}`}>
        {actor.name}
      </p>
      {showCharacter && actor.character && (
        <p className={`text-white/60 truncate max-w-full group-hover:text-white/80 transition-colors ${textSizeClasses[size]}`}>
          {actor.character}
        </p>
      )}
    </div>
  );

  if (showTooltip) {
    return (
      <ActorTooltip actor={actor}>
        {cardContent}
      </ActorTooltip>
    );
  }

  return cardContent;
};

export default ActorCard;
