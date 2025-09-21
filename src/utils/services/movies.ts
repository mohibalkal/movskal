import { tmdb, tmdbEnglish } from './tmdb';
import { trackEvent } from '@/lib/analytics';
import { Media, MovieImagesResponse } from '../types';
import { MovieDetails } from '../types/movie';
import { TMDBMovieResult, TMDBMovieDetailsResult } from '../types/tmdb';
import { formatMediaResult } from './media';
import { TMDB } from '../config/constants';

export async function getMovie(id: number): Promise<MovieDetails> {
  const response = await tmdb.get<TMDBMovieDetailsResult>(`/movie/${id}`);
  return formatMovieDetails(response.data);
}

export async function getPopularMovies(page = 1): Promise<Media[]> {
  // Determine if this is Arabic content based on current page
  // Only use Arabic for specific Arabic content pages, not homepage
  const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                      window.location.pathname.includes('/arabic-tv');
  
  // Use appropriate TMDB instance based on page type
  const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
  const languageFilter = isArabicPage ? 'ar' : 'en';
  
  const response = await tmdbInstance.get<{ results: TMDBMovieResult[] }>('/movie/popular', {
    params: { 
      page,
      with_original_language: languageFilter
    }
  });
  return response.data.results.map(formatMediaResult);
}

export async function getTopRatedMovies(page = 1): Promise<Media[]> {
  // Determine if this is Arabic content based on current page
  // Only use Arabic for specific Arabic content pages, not homepage
  const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                      window.location.pathname.includes('/arabic-tv');
  
  // Use appropriate TMDB instance based on page type
  const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
  const languageFilter = isArabicPage ? 'ar' : 'en';
  
  const response = await tmdbInstance.get<{ results: TMDBMovieResult[] }>('/movie/top_rated', {
    params: { 
      page,
      with_original_language: languageFilter
    }
  });
  return response.data.results.map(formatMediaResult);
}

export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week', page = 1): Promise<Media[]> {
  // Determine if this is Arabic content based on current page
  // Only use Arabic for specific Arabic content pages, not homepage
  const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                      window.location.pathname.includes('/arabic-tv');
  
  // Use appropriate TMDB instance based on page type
  const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
  const languageFilter = isArabicPage ? 'ar' : 'en';
  
  const response = await tmdbInstance.get<{ results: TMDBMovieResult[] }>(`/trending/movie/${timeWindow}`, {
    params: { 
      page,
      with_original_language: languageFilter
    }
  });
  return response.data.results.map(formatMediaResult);
}

// Get movie recommendations
export async function getMovieRecommendations(id: number): Promise<Media[]> {
  try {
    // Determine if this is Arabic content based on current page
    // Only use Arabic for specific Arabic content pages, not homepage
    const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                        window.location.pathname.includes('/arabic-tv');
    
    // Use appropriate TMDB instance based on page type
    const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
    const languageFilter = isArabicPage ? 'ar' : 'en';
    
    const response = await tmdbInstance.get<{ results: TMDBMovieResult[] }>(`/movie/${id}/recommendations`, {
      params: {
        with_original_language: languageFilter
      }
    });
    return response.data.results.map(item => formatMediaResult({...item, media_type: 'movie'}));
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    // Log API error to analytics
    await trackEvent({
      name: 'api_error',
      params: {
        api: 'tmdb/movie/recommendations',
        error: error instanceof Error ? error.message : String(error),
        movieId: id,
      },
    });
    return [];
  }
}

// Get movie details
export async function getMovieDetails(id: number): Promise<MovieDetails | null> {
  try {
    // Determine if this is Arabic content based on current page
    // Only use Arabic for specific Arabic content pages, not homepage
    const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                        window.location.pathname.includes('/arabic-tv');
    
    // Use appropriate TMDB instance based on page type
    const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
    
    const [detailsResponse, imagesResponse] = await Promise.all([
      tmdbInstance.get<TMDBMovieDetailsResult>(`/movie/${id}?append_to_response=release_dates`),
      tmdbInstance.get<MovieImagesResponse>(`/movie/${id}/images`)
    ]);
    
    const detailsData = detailsResponse.data;
    const imagesData = imagesResponse.data;
    
    let certification = "";
    if (detailsData.release_dates && detailsData.release_dates.results) {
      const usReleases = detailsData.release_dates?.results.find((country) => country.iso_3166_1 === "US");
      if (usReleases && usReleases.release_dates && usReleases.release_dates.length > 0) {
        certification = usReleases.release_dates[0].certification || "";
      }
    }

    let bestLogo = null;
    if (imagesData.logos && imagesData.logos.length > 0) {
      const englishLogos = imagesData.logos.filter(logo => logo.iso_639_1 === "en");
      if (englishLogos.length > 0) {
        bestLogo = englishLogos.reduce((prev, current) => 
          (prev.vote_average > current.vote_average) ? prev : current
        );
      }
    }
    
    // Ensure all required properties are present, and fall back to sensible defaults when needed
    const formattedData = formatMediaResult({...detailsData, media_type: 'movie'});
    
    // Since we're using Arabic language in TMDB API, the title should already be in Arabic
    // But we'll still check for original title if it's different
    const getBestTitle = () => {
      if (detailsData.original_title && detailsData.original_title !== detailsData.title) {
        return detailsData.original_title;
      }
      return formattedData.title || detailsData.title || 'Unknown Movie';
    };

    return {
      ...formattedData,
      title: getBestTitle(),
      release_date: formattedData.release_date || detailsData.release_date || '',
      runtime: detailsData.runtime || 0,
      genres: detailsData.genres || [],
      status: detailsData.status || '',
      tagline: detailsData.tagline || '',
      budget: detailsData.budget || 0,
      revenue: detailsData.revenue || 0,
      production_companies: detailsData.production_companies || [],
      certification: certification,
      logo_path: bestLogo ? bestLogo.file_path : null,
    };
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}:`, error);
    
    // Check if it's an API key error
    if (error instanceof Error && error.message.includes('401')) {
      console.error('TMDB API key is invalid or missing. Please check your VITE_TMDB_API_KEY environment variable.');
    }
    
    // Log API error to analytics
    await trackEvent({
      name: 'api_error',
      params: {
        api: 'tmdb/movie/details',
        error: error instanceof Error ? error.message : String(error),
        movieId: id,
      },
    });
    return null;
  }
}

// Validate TMDB movie ID
export async function validateMovieId(tmdbId: number): Promise<boolean> {
  try {
    const response = await tmdb.get(`/movie/${tmdbId}`);
    return response.data && response.data.id === tmdbId;
  } catch (error) {
    // Log API error to analytics
    await trackEvent({
      name: 'api_error',
      params: {
        api: 'tmdb/movie/validate',
        error: error instanceof Error ? error.message : String(error),
        movieId: tmdbId,
      },
    });
    return false;
  }
}

function formatMovieDetails(movie: TMDBMovieDetailsResult): MovieDetails {
  const formattedData = formatMediaResult({...movie, media_type: 'movie'});
  
  return {
    ...formattedData,
    title: movie.title || 'Unknown Movie',
    release_date: movie.release_date || '',
    runtime: movie.runtime || 0,
    genres: movie.genres || [],
    status: movie.status || '',
    tagline: movie.tagline || '',
    budget: movie.budget || 0,
    revenue: movie.revenue || 0,
    production_companies: movie.production_companies || [],
    certification: '',  // Set by parent function after release dates lookup
    logo_path: null,  // Set by parent function after image lookup
  };
}
