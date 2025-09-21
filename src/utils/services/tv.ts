import { tmdb, tmdbEnglish } from './tmdb';
import { Media, Episode, MovieImagesResponse } from '../types';
import { TVDetails } from '../types/tv';
import { TMDBTVResult, TMDBTVDetailsResult } from '../types/tmdb';
import { formatMediaResult } from './media';
import { TMDB } from '../config/constants';

export async function getTVShow(id: number): Promise<TVDetails> {
  const response = await tmdb.get<TMDBTVDetailsResult>(`/tv/${id}`);
  return formatTVDetails(response.data);
}

export async function getPopularTVShows(page = 1): Promise<Media[]> {
  // Determine if this is Arabic content based on current page
  // Only use Arabic for specific Arabic content pages, not homepage
  const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                      window.location.pathname.includes('/arabic-tv');
  
  // Use appropriate TMDB instance based on page type
  const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
  const languageFilter = isArabicPage ? 'ar' : 'en';
  
  const response = await tmdbInstance.get<{ results: TMDBTVResult[] }>('/tv/popular', {
    params: { 
      page,
      with_original_language: languageFilter
    }
  });
  return response.data.results.map(formatMediaResult);
}

export async function getTopRatedTVShows(page = 1): Promise<Media[]> {
  // Determine if this is Arabic content based on current page
  // Only use Arabic for specific Arabic content pages, not homepage
  const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                      window.location.pathname.includes('/arabic-tv');
  
  // Use appropriate TMDB instance based on page type
  const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
  const languageFilter = isArabicPage ? 'ar' : 'en';
  
  const response = await tmdbInstance.get<{ results: TMDBTVResult[] }>('/tv/top_rated', {
    params: { 
      page,
      with_original_language: languageFilter
    }
  });
  return response.data.results.map(formatMediaResult);
}

export async function getTrendingTVShows(timeWindow: 'day' | 'week' = 'week', page = 1): Promise<Media[]> {
  // Determine if this is Arabic content based on current page
  // Only use Arabic for specific Arabic content pages, not homepage
  const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                      window.location.pathname.includes('/arabic-tv');
  
  // Use appropriate TMDB instance based on page type
  const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
  const languageFilter = isArabicPage ? 'ar' : 'en';
  
  const response = await tmdbInstance.get<{ results: TMDBTVResult[] }>(`/trending/tv/${timeWindow}`, {
    params: { 
      page,
      with_original_language: languageFilter
    }
  });
  return response.data.results.map(formatMediaResult);
}

export async function getTVEpisode(id: number, season: number, episode: number): Promise<Episode> {
  const response = await tmdb.get<TVEpisodeResult>(`/tv/${id}/season/${season}/episode/${episode}`);
  return {
    id: response.data.id,
    name: response.data.name,
    overview: response.data.overview,
    episode_number: response.data.episode_number,
    season_number: response.data.season_number,
    still_path: response.data.still_path,
    air_date: response.data.air_date,
    vote_average: response.data.vote_average
  };
}

// Get TV show recommendations
export async function getTVRecommendations(id: number): Promise<Media[]> {
  try {
    // First get the TV show details to check its original language
    const tvDetails = await tmdb.get(`/tv/${id}`);
    const originalLanguage = tvDetails.data.original_language;
    
    // Use appropriate TMDB instance based on original language
    const tmdbInstance = originalLanguage === 'ar' ? tmdb : tmdbEnglish;
    
    const response = await tmdbInstance.get<{ results: TMDBTVResult[] }>(`/tv/${id}/recommendations`, {
      params: {
        with_original_language: originalLanguage // Use the same language as the original TV show
      }
    });
    return response.data.results.map(item => formatMediaResult({...item, media_type: 'tv'}));
  } catch (error) {
    console.error('Error fetching TV recommendations:', error);
    return [];
  }
}

interface TVEpisodeResult {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  air_date: string;
  vote_average: number;
}

// Get TV show details
export async function getTVDetails(id: number): Promise<TVDetails | null> {
  try {
    // Determine if this is Arabic content based on current page
    // Only use Arabic for specific Arabic content pages, not homepage
    const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                        window.location.pathname.includes('/arabic-tv');
    
    // Use appropriate TMDB instance based on page type
    const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
    
    const [detailsResponse, imagesResponse] = await Promise.all([
      tmdbInstance.get<TMDBTVDetailsResult>(`/tv/${id}?append_to_response=content_ratings`),
      tmdbInstance.get<MovieImagesResponse>(`/tv/${id}/images`)
    ]);
    
    const detailsData = detailsResponse.data;
    const imagesData = imagesResponse.data;
    
    let certification = "";
    if (detailsData.content_ratings && detailsData.content_ratings.results) {
      const usRating = detailsData.content_ratings?.results.find((country) => country.iso_3166_1 === "US");
      if (usRating) {
        certification = usRating.rating || "";
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
    const formattedData = formatMediaResult({...detailsData, media_type: 'tv'});
    
    // Since we're using Arabic language in TMDB API, the name should already be in Arabic
    // But we'll still check for original name if it's different
    const getBestName = () => {
      if (detailsData.original_name && detailsData.original_name !== detailsData.name) {
        return detailsData.original_name;
      }
      return formattedData.name || detailsData.name || 'Unknown TV Show';
    };

    return {
      ...formattedData,
      name: getBestName(),
      first_air_date: formattedData.first_air_date || detailsData.first_air_date || '',
      episode_run_time: detailsData.episode_run_time || [],
      genres: detailsData.genres || [],
      status: detailsData.status || '',
      tagline: detailsData.tagline || '',
      number_of_episodes: detailsData.number_of_episodes || 0,
      number_of_seasons: detailsData.number_of_seasons || 0,
      seasons: detailsData.seasons || [],
      production_companies: detailsData.production_companies || [],
      certification: certification,
      logo_path: bestLogo ? bestLogo.file_path : null,
    };
  } catch (error) {
    console.error(`Error fetching TV details for id ${id}:`, error);
    
    // Check if it's an API key error
    if (error instanceof Error && error.message.includes('401')) {
      console.error('TMDB API key is invalid or missing. Please check your VITE_TMDB_API_KEY environment variable.');
    }
    
    return null;
  }
}

// Validate TMDB TV ID
export async function validateTVId(tmdbId: number): Promise<boolean> {
  try {
    const response = await tmdb.get(`/tv/${tmdbId}`);
    return response.data && response.data.id === tmdbId;
  } catch (error) {
    return false;
  }
}

function formatTVDetails(show: TMDBTVDetailsResult): TVDetails {
  const formattedData = formatMediaResult({...show, media_type: 'tv'});
  
  return {
    ...formattedData,
    name: show.name || 'Unknown TV Show',
    first_air_date: show.first_air_date || '',
    episode_run_time: show.episode_run_time || [],
    genres: show.genres || [],
    status: show.status || '',
    tagline: show.tagline || '',
    number_of_episodes: show.number_of_episodes || 0,
    number_of_seasons: show.number_of_seasons || 0,
    seasons: show.seasons || [],
    production_companies: show.production_companies || [],
    certification: '',  // Set by parent function after content ratings lookup
    logo_path: null,  // Set by parent function after image lookup
  };
}

// Get TV show season details
export async function getSeasonDetails(
  id: number,
  seasonNumber: number
): Promise<Episode[]> {
  try {
    const response = await tmdb.get<{ episodes: Episode[] }>(`/tv/${id}/season/${seasonNumber}`);
    return response.data.episodes;
  } catch (error) {
    console.error(`Error fetching season ${seasonNumber} for TV show ${id}:`, error);
    return [];
  }
}
