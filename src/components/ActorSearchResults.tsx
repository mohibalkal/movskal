import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPopularActors, ActorDetails } from '@/utils/services/actor';
import ActorCard from '@/components/ActorCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ActorSearchResultsProps {
  query?: string;
  limit?: number;
}

export const ActorSearchResults: React.FC<ActorSearchResultsProps> = ({ 
  query = '',
  limit = 20 
}) => {
  const { t } = useTranslation();
  const [actors, setActors] = useState<ActorDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setLoading(true);
        const popularActors = await getPopularActors(1);
        
        // Filter actors based on search query
        const filteredActors = searchQuery 
          ? popularActors.filter(actor => 
              actor.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : popularActors;
            
        setActors(filteredActors.slice(0, limit));
      } catch (error) {
        console.error('Error fetching actors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, [searchQuery, limit]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <Skeleton key={index} className="w-32 h-40 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
          <Input
            placeholder={t('search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>
      </div>

      {actors.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold text-white mb-4">
            {t('actor.popularWorks')} ({actors.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {actors.map((actor) => (
              <ActorCard
                key={actor.id}
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
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">
            {searchQuery ? t('actor.noWorksFound') : t('actor.loadingWorks')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActorSearchResults;
