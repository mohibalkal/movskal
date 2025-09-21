import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getPopularActors, ActorDetails } from '@/utils/services/actor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActorCard from '@/components/ActorCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';

const Actors = () => {
  const { t } = useTranslation();
  const [actors, setActors] = useState<ActorDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActors, setFilteredActors] = useState<ActorDetails[]>([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        setLoading(true);
        const popularActors = await getPopularActors(1);
        setActors(popularActors);
        setFilteredActors(popularActors);
      } catch (error) {
        console.error('Error fetching actors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = actors.filter(actor =>
        actor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredActors(filtered);
    } else {
      setFilteredActors(actors);
    }
  }, [searchQuery, actors]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Users className="w-10 h-10" />
            {t('actor.popularWorks')}
          </h1>
          <p className="text-white/70 text-lg">
            {t('actor.popularWorks')} - {t('actor.clickToViewWorks')}
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} className="w-32 h-40 rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {filteredActors.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-white/70">
                    {t('search.showingCount', { 
                      displayed: filteredActors.length, 
                      total: actors.length 
                    })}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {filteredActors.map((actor) => (
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
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Actors;
