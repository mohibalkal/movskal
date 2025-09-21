import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPopularActors, ActorDetails } from '@/utils/services/actor';
import { getImageUrl } from '@/utils/services/tmdb';
import ActorCard from '@/components/ActorCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PopularActorsProps {
  title?: string;
  limit?: number;
}

export const PopularActors: React.FC<PopularActorsProps> = ({ 
  title,
  limit = 10 
}) => {
  const { t } = useTranslation();
  const [actors, setActors] = useState<ActorDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setLoading(true);
        const popularActors = await getPopularActors(1);
        setActors(popularActors.slice(0, limit));
      } catch (error) {
        console.error('Error fetching popular actors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, [limit]);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {title || t('actor.popularWorks')}
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} className="w-32 h-40 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (actors.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        {title || t('actor.popularWorks')}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
        {actors.map((actor) => (
          <div key={actor.id} className="flex-shrink-0">
            <ActorCard
              actor={{
                id: actor.id,
                name: actor.name,
                character: actor.known_for_department,
                profile_path: actor.profile_path,
                order: 0
              }}
              showCharacter={false}
              size="medium"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularActors;
