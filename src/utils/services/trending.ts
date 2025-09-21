import { tmdb, tmdbEnglish } from './tmdb';
import { Media } from '../types';
import { TMDBMovieResult, TMDBTVResult } from '../types/tmdb';
import { formatMediaResult } from './media';

// Get trending movies and TV shows
export async function getTrending(timeWindow: 'day' | 'week' = 'week', page = 1): Promise<Media[]> {
  try {
    // Determine if this is Arabic content based on current page
    // Only use Arabic for specific Arabic content pages, not homepage
    const isArabicPage = window.location.pathname.includes('/arabic-movies') || 
                        window.location.pathname.includes('/arabic-tv');
    
    // Use appropriate TMDB instance based on page type
    const tmdbInstance = isArabicPage ? tmdb : tmdbEnglish;
    const languageFilter = isArabicPage ? 'ar' : 'en';
    
    const [moviesResponse, tvShowsResponse] = await Promise.all([
      tmdbInstance.get<{ results: TMDBMovieResult[] }>(`/trending/movie/${timeWindow}`, {
        params: { 
          page,
          with_original_language: languageFilter
        }
      }),
      tmdbInstance.get<{ results: TMDBTVResult[] }>(`/trending/tv/${timeWindow}`, {
        params: { 
          page,
          with_original_language: languageFilter
        }
      })
    ]);

    // Combine and format all results
    const movies = moviesResponse.data.results.map(item => 
      formatMediaResult({ ...item, media_type: 'movie' }));
    const tvShows = tvShowsResponse.data.results.map(item => 
      formatMediaResult({ ...item, media_type: 'tv' }));

    // Merge and sort by popularity (vote_average)
    const combined = [...movies, ...tvShows]
      .sort((a, b) => b.vote_average - a.vote_average)
      // Take top ITEMS_PER_PAGE items to maintain consistent pagination
      .slice(0, 20);

    return combined;
  } catch (error) {
    console.error('Error fetching trending content:', error);
    
    // Check if it's an API key error
    if (error instanceof Error && error.message.includes('401')) {
      console.error('TMDB API key is invalid or missing. Please check your VITE_TMDB_API_KEY environment variable.');
    }
    
    return [];
  }
}
