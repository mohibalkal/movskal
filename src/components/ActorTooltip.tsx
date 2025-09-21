import React from 'react';
import { CastMember } from '@/utils/types';
import { getImageUrl } from '@/utils/services/tmdb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, Star, MapPin } from 'lucide-react';

interface ActorTooltipProps {
  actor: CastMember;
  children: React.ReactNode;
}

export const ActorTooltip: React.FC<ActorTooltipProps> = ({ actor, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4 bg-black/90 border border-white/20">
          <div className="flex gap-3">
            {actor.profile_path && getImageUrl(actor.profile_path, 'w92') && (
              <img
                src={getImageUrl(actor.profile_path, 'w92')}
                alt={actor.name}
                className="w-16 h-20 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white text-sm mb-1 truncate">
                {actor.name}
              </h4>
              <p className="text-white/80 text-xs mb-2 truncate">
                {actor.character}
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-white/60 text-xs">
                  <Star className="w-3 h-3" />
                  <span>Click to view filmography</span>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActorTooltip;
