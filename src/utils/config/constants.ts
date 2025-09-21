
// Debug API key loading
console.log('Environment VITE_TMDB_API_KEY:', import.meta.env.VITE_TMDB_API_KEY);
console.log('Final API key:', import.meta.env.VITE_TMDB_API_KEY || '18f5b196262c331e2e29bcbe652ffdba');

const TMDB = {
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || '18f5b196262c331e2e29bcbe652ffdba',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  posterSizes: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },  
  backdropSizes: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  }
};

// Export individual constants for easier imports
export const TMDB_API_KEY = TMDB.API_KEY;
export const BASE_URL = TMDB.BASE_URL;
export const IMAGE_BASE_URL = TMDB.IMAGE_BASE_URL;

export { TMDB };
export const { posterSizes, backdropSizes } = TMDB;
