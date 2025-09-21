import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getActorDetails, getActorFilmography, ActorDetails as ActorDetailsType, ActorCredit } from '@/utils/services/actor';
import { getImageUrl } from '@/utils/services/tmdb';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MediaCard from '@/components/MediaCard';
import { Media } from '@/utils/types';
import { Calendar, MapPin, Star, Users, Film, Tv } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const ActorDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [actor, setActor] = useState<ActorDetailsType | null>(null);
  const [filmography, setFilmography] = useState<{ cast: ActorCredit[]; crew: ActorCredit[] }>({ cast: [], crew: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'cast' | 'crew'>('cast');

  useEffect(() => {
    const fetchActorData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [actorData, filmographyData] = await Promise.all([
          getActorDetails(parseInt(id)),
          getActorFilmography(parseInt(id))
        ]);
        
        setActor(actorData);
        setFilmography(filmographyData);
      } catch (error) {
        console.error('Error fetching actor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorData();
  }, [id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('actor.unknown');
    return new Date(dateString).toLocaleDateString();
  };

  const convertToMedia = (credit: ActorCredit): Media => ({
    id: credit.id,
    title: credit.title || credit.name || '',
    overview: '',
    poster_path: credit.poster_path,
    backdrop_path: null,
    release_date: credit.release_date || credit.first_air_date || '',
    vote_average: 0,
    vote_count: 0,
    genre_ids: [],
    adult: false,
    original_language: 'en',
    original_title: credit.title || credit.name || '',
    popularity: 0,
    video: false,
    media_type: credit.media_type
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-64 h-96 rounded-lg" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">{t('errors.notFound')}</h1>
          <Button onClick={() => navigate(-1)}>
            {t('common.back')}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Actor Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-64 h-96 rounded-lg overflow-hidden">
            {actor.profile_path ? (
              <img
                src={getImageUrl(actor.profile_path, 'w500')}
                alt={actor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Users className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-4">{actor.name}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white/70" />
                <span className="text-white/70">
                  {actor.birthday ? formatDate(actor.birthday) : t('actor.unknown')}
                  {actor.deathday && (
                    <span className="ml-2">
                      - {formatDate(actor.deathday)}
                    </span>
                  )}
                </span>
              </div>
              
              {actor.place_of_birth && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span className="text-white/70">{actor.place_of_birth}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-white/70" />
                <span className="text-white/70">{actor.known_for_department}</span>
              </div>
            </div>

            {actor.biography && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">{t('actor.biography')}</h3>
                <p className="text-white/80 leading-relaxed">{actor.biography}</p>
              </div>
            )}
          </div>
        </div>

        {/* Filmography Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'cast' | 'crew')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="cast" className="flex items-center gap-2">
              <Film className="w-4 h-4" />
              {t('actor.movies')} ({filmography.cast.length})
            </TabsTrigger>
            <TabsTrigger value="crew" className="flex items-center gap-2">
              <Tv className="w-4 h-4" />
              {t('actor.tvShows')} ({filmography.crew.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cast">
            {filmography.cast.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filmography.cast.map((credit) => (
                  <div key={`${credit.id}-${credit.media_type}`}>
                    <MediaCard
                      media={convertToMedia(credit)}
                      showRating={false}
                    />
                    {credit.character && (
                      <p className="text-sm text-white/70 mt-2 text-center">
                        {credit.character}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">{t('media.noCast')}</p>
            )}
          </TabsContent>

          <TabsContent value="crew">
            {filmography.crew.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filmography.crew.map((credit) => (
                  <div key={`${credit.id}-${credit.media_type}`}>
                    <MediaCard
                      media={convertToMedia(credit)}
                      showRating={false}
                    />
                    {credit.job && (
                      <p className="text-sm text-white/70 mt-2 text-center">
                        {credit.job}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">{t('media.noCast')}</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default ActorDetailsPage;