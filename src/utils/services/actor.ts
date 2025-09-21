import { tmdb } from './tmdb';
import { Media } from '../types';

export interface ActorDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
  known_for_department: string;
}

export interface ActorCredit {
  id: number;
  title?: string;
  name?: string;
  character: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  media_type: 'movie' | 'tv';
  popularity: number;
}

export interface ActorFilmography {
  cast: ActorCredit[];
  crew: ActorCredit[];
}

// Get actor details
export const getActorDetails = async (id: number): Promise<ActorDetails | null> => {
  try {
    const response = await tmdb.get(`/person/${id}`);
    const data = response.data;
    
    return {
      id: data.id,
      name: data.name,
      biography: data.biography || '',
      birthday: data.birthday,
      deathday: data.deathday,
      place_of_birth: data.place_of_birth,
      profile_path: data.profile_path,
      popularity: data.popularity,
      known_for_department: data.known_for_department || 'Acting',
    };
  } catch (error) {
    console.error(`Error fetching actor details for id ${id}:`, error);
    return null;
  }
};

// Get actor filmography (movies and TV shows)
export const getActorFilmography = async (id: number): Promise<ActorFilmography> => {
  try {
    const response = await tmdb.get(`/person/${id}/combined_credits`);
    const data = response.data;
    
    const formatCredit = (credit: any): ActorCredit => ({
      id: credit.id,
      title: credit.title || credit.name,
      name: credit.name || credit.title,
      character: credit.character || credit.job || '',
      poster_path: credit.poster_path,
      backdrop_path: credit.backdrop_path,
      release_date: credit.release_date,
      first_air_date: credit.first_air_date,
      vote_average: credit.vote_average || 0,
      vote_count: credit.vote_count || 0,
      media_type: credit.media_type,
      popularity: credit.popularity || 0,
    });

    return {
      cast: (data.cast || []).map(formatCredit),
      crew: (data.crew || []).map(formatCredit),
    };
  } catch (error) {
    console.error(`Error fetching actor filmography for id ${id}:`, error);
    return { cast: [], crew: [] };
  }
};

// Get popular actors
export const getPopularActors = async (page: number = 1): Promise<ActorDetails[]> => {
  try {
    const response = await tmdb.get(`/person/popular?page=${page}`);
    const data = response.data;
    
    return (data.results || []).map((actor: any) => ({
      id: actor.id,
      name: actor.name,
      biography: actor.biography || '',
      birthday: actor.birthday,
      deathday: actor.deathday,
      place_of_birth: actor.place_of_birth,
      profile_path: actor.profile_path,
      popularity: actor.popularity,
      known_for_department: actor.known_for_department || 'Acting',
    }));
  } catch (error) {
    console.error(`Error fetching popular actors:`, error);
    return [];
  }
};
