import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieRecommendations, getMovieTrailer, backdropSizes, posterSizes, getMovieCast } from '@/utils/api';
import { getImageUrl } from '@/utils/services/tmdb';
import { MovieDetails, Media, CastMember } from '@/utils/types';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ContentRow from '@/components/ContentRow';
import ReviewSection from '@/components/ReviewSection';
import ActorCard from '@/components/ActorCard';
import { Play, Clock, Calendar, Star, ArrowLeft, Shield, Heart, Bookmark, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { useWatchHistory } from '@/hooks/watch-history';
import { DownloadModal } from '@/components/DownloadModal';
import { useAuth } from '@/hooks';
import { useHaptic } from '@/hooks/useHaptic';
import { useTranslation } from 'react-i18next';

type TabType = 'about' | 'cast' | 'reviews';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [recommendations, setRecommendations] = useState<Media[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const { 
    addToFavorites, 
    addToWatchlist,
    removeFromFavorites,
    removeFromWatchlist,
    isInFavorites,
    isInWatchlist 
  } = useWatchHistory();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInMyWatchlist, setIsInMyWatchlist] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { triggerHaptic } = useHaptic();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        setError(t('errors.notFound'));
        setIsLoading(false);
        return;
      }

      const movieId = parseInt(id, 10);
      if (isNaN(movieId)) {
        setError(t('errors.notFound'));
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const [movieData, recommendationsData, castData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieRecommendations(movieId),
          getMovieCast(movieId),
        ]);
        
        if (!movieData) {
          setError(t('media.movieNotFound'));
          return;
        }
        
        setMovie(movieData);
        setRecommendations(recommendationsData);
        setCast(castData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError(t('common.error'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieData();
  }, [id, t]);
  
  useEffect(() => {
    const fetchTrailer = async () => {
      if (movie?.id) {
        try {
          const trailerData = await getMovieTrailer(movie.id);
          setTrailerKey(trailerData);
        } catch (error) {
          console.error('Error fetching trailer:', error);
        }
      }
    };
    
    fetchTrailer();
  }, [movie?.id]);

  useEffect(() => {
    if (movie?.id) {
      setIsFavorite(isInFavorites(movie.id, 'movie'));
      setIsInMyWatchlist(isInWatchlist(movie.id, 'movie'));
    }
  }, [movie?.id, isInFavorites, isInWatchlist]);

  const handlePlayMovie = () => {
    if (movie) {
      navigate(`/watch/movie/${movie.id}`);
    }
  };

  const handleOpenDownloads = () => {
    setIsDownloadDialogOpen(true);
  };

  const handleToggleFavorite = () => {
    if (!movie) return;
    
    if (isFavorite) {
      removeFromFavorites(movie.id, 'movie');
      setIsFavorite(false);
    } else {
      addToFavorites({
        media_id: movie.id,
        media_type: 'movie',
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        rating: movie.vote_average
      });
      setIsFavorite(true);
    }
  };

  const handleToggleWatchlist = () => {
    if (!movie) return;
    
    if (isInMyWatchlist) {
      removeFromWatchlist(movie.id, 'movie');
      setIsInMyWatchlist(false);
    } else {
      addToWatchlist({
        media_id: movie.id,
        media_type: 'movie',
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        rating: movie.vote_average
      });
      setIsInMyWatchlist(true);
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse-slow text-white font-medium">{t('media.loading')}</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-2xl text-white mb-4">{error}</h1>
        <Button onClick={() => navigate('/')} variant="outline">
          {t('media.returnHome')}
        </Button>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className="text-2xl text-white mb-4">{t('media.movieNotFound')}</h1>
        <Button onClick={() => navigate('/')} variant="outline">
          {t('media.returnHome')}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Backdrop Image */}
      <div className="relative w-full h-[70vh]">
        {/* Loading skeleton */}
        {!backdropLoaded && (
          <div className="absolute inset-0 bg-background image-skeleton" />
        )
        }
        
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-20 left-6 z-10 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <img
          src={getImageUrl(movie.backdrop_path, backdropSizes.original)}
          alt={movie.title || 'Movie backdrop'}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            backdropLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setBackdropLoaded(true)}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 details-gradient" />
        
        {/* Trailer section - only show on desktop */}
        {!isMobile && trailerKey && (
          <div className="absolute inset-0 bg-black/60">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${trailerKey}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Movie info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="flex flex-col md:flex-row items-start gap-6 max-w-6xl mx-auto">
            <div className="hidden md:block flex-shrink-0 w-48 xl:w-64 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={movie.poster_path ? getImageUrl(movie.poster_path, posterSizes.medium) : '/placeholder.svg'} 
                alt={movie.title || 'Movie poster'} 
                className="w-full h-auto"
              />
            </div>
            
            <div className="flex-1 animate-slide-up">
              {movie.logo_path ? (
                <div className="relative w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] mx-auto mb-4 
                              transition-all duration-300 ease-in-out hover:scale-105">
                  {/* Loading skeleton */}
                  {!logoLoaded && (
                    <div className="absolute inset-0 bg-background image-skeleton rounded-lg" />
                  )}
                  
                  <img
                    src={getImageUrl(movie.logo_path, backdropSizes.original)}
                    alt={movie.title}
                    className={`w-full h-auto object-contain filter drop-shadow-lg
                              transition-opacity duration-700 ease-in-out
                              ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLogoLoaded(true)}
                  />
                </div>
              ) : (
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 text-balance
                             animate-fade-in">
                  {movie.title}
                </h1>
              )}
              
              {movie.tagline && (
                <p className="text-white/70 mb-4 italic text-lg">{movie.tagline}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {movie.certification && (
                  <div className="flex items-center bg-white/20 px-2 py-1 rounded">
                    <Shield className="h-4 w-4 mr-1 text-white" />
                    <span className="text-white font-medium text-sm">{movie.certification}</span>
                  </div>
                )}
                
                {movie.release_date && (
                  <div className="flex items-center text-white/80">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(movie.release_date).getFullYear()}
                  </div>
                )}
                
                {movie.runtime > 0 && (
                  <div className="flex items-center text-white/80">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatRuntime(movie.runtime)}
                  </div>
                )}
                
                {movie.vote_average > 0 && (
                  <div className="flex items-center text-amber-400">
                    <Star className="h-4 w-4 mr-2 fill-amber-400" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-white/80 mb-6">{movie.overview}</p>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handlePlayMovie}
                  className="bg-accent hover:bg-accent/80 text-white flex items-center"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {t('media.play')}
                </Button>

                <Button 
                  onClick={handleToggleFavorite}
                  variant="outline"
                  className={`border-white/20 ${isFavorite ? 'bg-accent text-white' : 'bg-black/50 text-white hover:bg-black/70'}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? t('media.inFavorites') : t('media.addToFavorites')}
                </Button>

                <Button 
                  onClick={handleToggleWatchlist}
                  variant="outline"
                  className={`border-white/20 ${isInMyWatchlist ? 'bg-accent text-white' : 'bg-black/50 text-white hover:bg-black/70'}`}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${isInMyWatchlist ? 'fill-current' : ''}`} />
                  {isInMyWatchlist ? t('media.inWatchlist') : t('media.addToWatchlist')}
                </Button>

                {user && (
                  <Button 
                    onClick={handleOpenDownloads}
                    variant="outline"
                    className="border-white/20 bg-black/50 text-white hover:bg-black/70 flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t('media.tabs.downloads')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for About, Cast, and Reviews */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex border-b border-white/10 mb-6">
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'about' 
                ? 'text-white border-b-2 border-accent' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => { triggerHaptic(); setActiveTab('about'); }}
          >
            {t('media.tabs.about')}
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'cast' 
                ? 'text-white border-b-2 border-accent' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => { triggerHaptic(); setActiveTab('cast'); }}
          >
            {t('media.tabs.cast')}
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'reviews' 
                ? 'text-white border-b-2 border-accent' 
                : 'text-white/60 hover:text-white'
            }`}
            onClick={() => { triggerHaptic(); setActiveTab('reviews'); }}
          >
            {t('media.tabs.reviews')}
          </button>
        </div>
        
        {activeTab === 'about' ? (
          <>
            {/* Additional movie details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">{t('media.status')}</h3>
                <p className="text-white/80">{movie.status}</p>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">{t('media.budget')}</h3>
                <p className="text-white/80">
                  {movie.budget > 0 
                    ? `$${movie.budget.toLocaleString()}` 
                    : 'Not available'}
                </p>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">{t('media.revenue')}</h3>
                <p className="text-white/80">
                  {movie.revenue > 0 
                    ? `$${movie.revenue.toLocaleString()}` 
                    : 'Not available'}
                </p>
              </div>
            </div>
            
            {/* Production companies */}
            {movie.production_companies.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">{t('media.productionCompanies')}</h3>
                <div className="flex flex-wrap gap-6">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="text-center">
                      {company.logo_path ? (
                        <div className="bg-white/10 p-3 rounded-lg w-24 h-16 flex items-center justify-center mb-2">
                          <img 
                            src={getImageUrl(company.logo_path, posterSizes.small)} 
                            alt={company.name} 
                            className="max-w-full max-h-full"
                          />
                        </div>
                      ) : (
                        <div className="bg-white/10 p-3 rounded-lg w-24 h-16 flex items-center justify-center mb-2">
                          <span className="text-white/70 text-xs text-center">{company.name}</span>
                        </div>
                      )}
                      <p className="text-white/70 text-sm">{company.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : activeTab === 'cast' ? (
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
        ) : (
          /* Reviews section */
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">{t('media.userReviews')}</h3>
            <ReviewSection mediaId={parseInt(id!, 10)} mediaType="movie" />
          </div>
        )}
      </div>
      
      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <ContentRow
          title={t('media.moreLikeThis')}
          media={recommendations}
        />
      )}

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadDialogOpen}
        onClose={() => setIsDownloadDialogOpen(false)}
        mediaId={id!}
        mediaType="movie"
        mediaTitle={movie.title}
      />
    </div>
  );
};

export default MovieDetailsPage;
