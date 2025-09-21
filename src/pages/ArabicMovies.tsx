import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { tmdb, tmdbEnglish } from '@/utils/services/tmdb';
import { Media } from '@/utils/types';
import Navbar from '@/components/Navbar';
import MediaGrid from '@/components/MediaGrid';
import ContentRow from '@/components/ContentRow';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Film, Grid3X3, List, ChevronDown } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const ArabicMovies = () => {
  const { t } = useTranslation();
  const [arabicMovies, setArabicMovies] = useState<Media[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'vote_average' | 'release_date'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>('2025');

  useEffect(() => {
    const fetchArabicMovies = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          with_original_language: 'ar',
          with_production_countries: 'EG,SA,AE,JO,LB,SY,IQ,KW,QA,BH,OM,YE,MA,DZ,TN,LY,SD,SO,DJ,KM,MR',
          sort_by: `${sortBy}.desc`,
          page: currentPage,
          include_adult: false,
          vote_count_gte: 5
        };

        // Add genre filtering using TMDB genre IDs
        if (selectedGenre !== 'all') {
          params.with_genres = selectedGenre;
        }

        // Add year filter for recent movies
        if (yearFilter === 'recent') {
          const currentYear = new Date().getFullYear();
          params.primary_release_date_gte = `${currentYear - 5}-01-01`;
        } else if (yearFilter !== 'all') {
          params.primary_release_year = yearFilter;
        }

        let response = await tmdb.get('/discover/movie', { params });
        let newMovies = response.data.results;

        // If no results, try alternative search with different parameters
        if (newMovies.length === 0) {
          console.log('No Arabic movies found with original language filter, trying alternative search...');
          const altParams = {
            with_production_countries: 'EG,SA,AE,JO,LB,SY,IQ,KW,QA,BH,OM,YE,MA,DZ,TN,LY,SD,SO,DJ,KM,MR',
            sort_by: `${sortBy}.desc`,
            page: currentPage,
            include_adult: false,
            vote_count_gte: 3
          };
          
          if (selectedGenre !== 'all') {
            altParams.with_genres = selectedGenre;
          }
          
          if (yearFilter === 'recent') {
            const currentYear = new Date().getFullYear();
            altParams.primary_release_date_gte = `${currentYear - 5}-01-01`;
          } else if (yearFilter !== 'all') {
            altParams.primary_release_year = yearFilter;
          }
          
          response = await tmdb.get('/discover/movie', { params: altParams });
          newMovies = response.data.results;
        }

        const formatMediaResult = (item: any): Media => ({
          id: item.id,
          title: item.title || null,
          name: item.name || null,
          poster_path: item.poster_path || null,
          backdrop_path: item.backdrop_path || null,
          overview: item.overview || '',
          vote_average: item.vote_average || 0,
          release_date: item.release_date || null,
          first_air_date: item.first_air_date || null,
          media_type: 'movie' as const,
          genre_ids: item.genre_ids || [],
        });

        const formattedMovies = newMovies.map(formatMediaResult);
        
        if (currentPage === 1) {
          setArabicMovies(formattedMovies);
        } else {
          setArabicMovies(prev => [...prev, ...formattedMovies]);
        }
        
        setHasMore(response.data.results.length === 20);
      } catch (error) {
        console.error('Error fetching Arabic movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArabicMovies();
  }, [selectedGenre, sortBy, currentPage, yearFilter]);

  // Fetch similar Arabic movies
  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        setIsLoadingSimilar(true);
        const params = {
          with_original_language: 'ar',
          with_production_countries: 'EG,SA,AE,JO,LB,SY,IQ,KW,QA,BH,OM,YE,MA,DZ,TN,LY,SD,SO,DJ,KM,MR',
          sort_by: 'popularity.desc',
          page: 1,
          include_adult: false,
          vote_count_gte: 3,
          primary_release_date_gte: '2020-01-01' // Last 5 years for similar content
        };

        let response = await tmdb.get('/discover/movie', { params });
        let results = response.data.results;

        // If no results, try alternative search
        if (results.length === 0) {
          console.log('No similar Arabic movies found, trying alternative search...');
          const altParams = {
            with_production_countries: 'EG,SA,AE,JO,LB,SY,IQ,KW,QA,BH,OM,YE,MA,DZ,TN,LY,SD,SO,DJ,KM,MR',
            sort_by: 'popularity.desc',
            page: 1,
            include_adult: false,
            vote_count_gte: 1,
            primary_release_date_gte: '2015-01-01'
          };
          
          response = await tmdb.get('/discover/movie', { params: altParams });
          results = response.data.results;
        }

        const formatMediaResult = (item: any): Media => ({
          id: item.id,
          title: item.title || null,
          name: item.name || null,
          poster_path: item.poster_path || null,
          backdrop_path: item.backdrop_path || null,
          overview: item.overview || '',
          vote_average: item.vote_average || 0,
          release_date: item.release_date || null,
          first_air_date: item.first_air_date || null,
          media_type: 'movie' as const,
          genre_ids: item.genre_ids || [],
        });

        const similar = results.slice(0, 20).map(formatMediaResult);
        setSimilarMovies(similar);
      } catch (error) {
        console.error('Error fetching similar Arabic movies:', error);
      } finally {
        setIsLoadingSimilar(false);
      }
    };

    fetchSimilarMovies();
  }, []);

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setArabicMovies([]);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort as 'popularity' | 'vote_average' | 'release_date');
    setCurrentPage(1);
    setArabicMovies([]);
  };

  const handleYearChange = (year: string) => {
    setYearFilter(year);
    setCurrentPage(1);
    setArabicMovies([]);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3 pt-10">
              <Film className="h-8 w-8 text-accent animate-pulse-slow" />
              <h1 className="text-3xl font-bold text-white">أفلام عربية</h1>
            </div>
            
            <div className="flex items-center gap-4 pt-6">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px] border-white/10 text-white bg-transparent">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10 text-white">
                  <SelectItem value="popularity">الشعبية</SelectItem>
                  <SelectItem value="vote_average">التقييم</SelectItem>
                  <SelectItem value="release_date">تاريخ الإصدار</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedGenre} onValueChange={handleGenreChange}>
                <SelectTrigger className="w-[180px] border-white/10 text-white bg-transparent">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10 text-white">
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="28">أكشن</SelectItem>
                  <SelectItem value="12">مغامرة</SelectItem>
                  <SelectItem value="16">رسوم متحركة</SelectItem>
                  <SelectItem value="35">كوميديا</SelectItem>
                  <SelectItem value="80">جريمة</SelectItem>
                  <SelectItem value="99">وثائقي</SelectItem>
                  <SelectItem value="18">دراما</SelectItem>
                  <SelectItem value="10751">عائلي</SelectItem>
                  <SelectItem value="14">فانتازيا</SelectItem>
                  <SelectItem value="36">تاريخي</SelectItem>
                  <SelectItem value="27">رعب</SelectItem>
                  <SelectItem value="10402">موسيقى</SelectItem>
                  <SelectItem value="9648">غموض</SelectItem>
                  <SelectItem value="10749">رومانسي</SelectItem>
                  <SelectItem value="878">خيال علمي</SelectItem>
                  <SelectItem value="10770">فيلم تلفزيوني</SelectItem>
                  <SelectItem value="53">إثارة</SelectItem>
                  <SelectItem value="10752">حرب</SelectItem>
                  <SelectItem value="37">غربي</SelectItem>
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={handleYearChange}>
                <SelectTrigger className="w-[180px] border-white/10 text-white bg-transparent">
                  <SelectValue placeholder="السنة" />
                </SelectTrigger>
                <SelectContent className="bg-background border-white/10 text-white">
                  <SelectItem value="recent">حديثة (آخر 5 سنوات)</SelectItem>
                  <SelectItem value="all">جميع السنوات</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2019">2019</SelectItem>
                  <SelectItem value="2018">2018</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="border-white/10 text-white hover:bg-white/10 group"
                onClick={toggleViewMode}
              >
                {viewMode === 'grid' ? (
                  <>
                    <List className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    قائمة
                  </>
                ) : (
                  <>
                    <Grid3X3 className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    شبكة
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {arabicMovies.length > 0 ? (
            <>
              <MediaGrid 
                media={arabicMovies.map(movie => ({ ...movie, media_id: movie.id }))} 
                listView={viewMode === 'list'} 
              />
              
              {hasMore && (
                <div className="flex justify-center my-8">
                  <Button 
                    onClick={handleLoadMore}
                    variant="outline"
                    className="border-white/10 text-white hover:bg-accent/20 hover:border-accent/50 hover:text-white transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      'جاري التحميل...'
                    ) : (
                      <>
                        عرض المزيد <ChevronDown className="ml-2 h-4 w-4 animate-bounce" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg mb-4">
                {selectedGenre !== 'all' 
                  ? `لا توجد أفلام عربية متاحة حالياً للتصنيف المحدد`
                  : 'لا توجد أفلام عربية متاحة حالياً'
                }
              </p>
              {selectedGenre !== 'all' && (
                <p className="text-white/50 text-sm">
                  جرب اختيار "جميع المصادر" أو تصنيف آخر
                </p>
              )}
            </div>
          )}

          {/* Similar Arabic Movies Section */}
          {!isLoadingSimilar && similarMovies.length > 0 && (
            <div className="mt-12">
              <ContentRow
                title="مشابه لهذا"
                media={similarMovies.map(movie => ({ ...movie, media_id: movie.id }))}
              />
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ArabicMovies;