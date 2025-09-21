// Environment variables with type-safe defaults
interface EnvConfig {
  GEMINI_API_KEY: string;
  TMDB_API_KEY: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// Read values from Vite environment with safe fallbacks
const env: EnvConfig = {
  GEMINI_API_KEY: (import.meta as any)?.env?.VITE_GEMINI_API_KEY || '',
  TMDB_API_KEY: (import.meta as any)?.env?.VITE_TMDB_API_KEY || '',
  NODE_ENV: (import.meta as any)?.env?.DEV ? 'development' : 'production'
};

export default env;