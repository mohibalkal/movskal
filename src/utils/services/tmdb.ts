import axios from 'axios';
import { TMDB } from '../config/constants';

// Validate API key
if (!TMDB.API_KEY || TMDB.API_KEY === 'your_tmdb_api_key_here') {
  console.error('TMDB API key is missing or invalid. Please set VITE_TMDB_API_KEY environment variable.');
}

// Create axios instance for TMDB with Arabic language (for Arabic content)
export const tmdb = axios.create({
  baseURL: TMDB.BASE_URL,
  params: {
    api_key: TMDB.API_KEY,
    language: 'ar-SA' // Use Arabic language for Arabic content
  }
});

// Create axios instance for TMDB with English language (for foreign content)
export const tmdbEnglish = axios.create({
  baseURL: TMDB.BASE_URL,
  params: {
    api_key: TMDB.API_KEY,
    language: 'en-US' // Use English language for foreign content
  }
});

// Helper function to get full image URL
export const getImageUrl = (path: string | null, size: string): string | null => {
  if (!path || path.trim() === '') return null;
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  const fullUrl = `${TMDB.IMAGE_BASE_URL}/${size}${normalizedPath}`;
  
  // Log for debugging in production
  if (import.meta.env.PROD) {
    console.log('Generated image URL:', fullUrl);
  }
  
  return fullUrl;
};

// Helper function to check if image URL is valid
export const isValidImageUrl = (url: string | null): boolean => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
