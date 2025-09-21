import { Media } from '../types';
import { TMDBMovieResult, TMDBTVResult } from '../types/tmdb';
import { getImageUrl } from './tmdb';

export function formatMediaResult(item: TMDBMovieResult | TMDBTVResult): Media {
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  
  // Since we're now using Arabic language in TMDB API, 
  // the titles should already be in Arabic, but we'll still check for original titles
  const getBestTitle = () => {
    // If we have an original title and it's different from the regular title, use original
    if (item.original_title && item.original_title !== item.title) {
      return item.original_title;
    }
    return item.title || null;
  };

  const getBestName = () => {
    // If we have an original name and it's different from the regular name, use original
    if (item.original_name && item.original_name !== item.name) {
      return item.original_name;
    }
    return item.name || null;
  };
  
  return {
    id: item.id,
    title: getBestTitle(),
    name: getBestName(),
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    overview: item.overview,
    vote_average: item.vote_average,
    release_date: item.release_date || null,
    first_air_date: item.first_air_date || null,
    media_type: mediaType as 'movie' | 'tv',
    genre_ids: item.genre_ids || [],
  };
}
