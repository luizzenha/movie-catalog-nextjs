import axios from 'axios';
import { Movie, MovieDetails, MoviesResponse } from '@/types/movie';
import { GenresResponse } from '@/types/genre';
import { mockMovies, mockMovieDetails, mockMoviesResponse } from './mock-data';

const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

// Verifica se a API key está configurada
const isApiConfigured = API_KEY && API_KEY !== 'your_api_key_here' && BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Dados mock para gêneros
const mockGenres: GenresResponse = {
  genres: [
    { id: 28, name: 'Ação' },
    { id: 12, name: 'Aventura' },
    { id: 16, name: 'Animação' },
    { id: 35, name: 'Comédia' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentário' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Família' },
    { id: 14, name: 'Fantasia' },
    { id: 36, name: 'História' },
    { id: 27, name: 'Terror' },
    { id: 10402, name: 'Música' },
    { id: 9648, name: 'Mistério' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Ficção Científica' },
    { id: 10770, name: 'Cinema TV' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'Guerra' },
    { id: 37, name: 'Faroeste' }
  ]
};

export const tmdbService = {
  // Buscar filmes populares
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    if (!isApiConfigured) {
      console.warn('⚠️ API key não configurada, usando dados mock');
      return mockMoviesResponse;
    }
    
    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes populares, usando dados mock:', error);
      return mockMoviesResponse;
    }
  },

  // Buscar filmes por query
  searchMovies: async (query: string, page: number = 1): Promise<MoviesResponse> => {
    if (!isApiConfigured) {
      console.warn('⚠️ API key não configurada, usando dados mock');
      const filteredMovies = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      return {
        ...mockMoviesResponse,
        results: filteredMovies,
        total_results: filteredMovies.length
      };
    }
    
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes, usando dados mock:', error);
      return mockMoviesResponse;
    }
  },

  // Buscar filmes por gênero
  getMoviesByGenre: async (genreId: number, page: number = 1): Promise<MoviesResponse> => {
    if (!isApiConfigured) {
      console.warn('⚠️ API key não configurada, usando dados mock');
      const filteredMovies = mockMovies.filter(movie => 
        movie.genre_ids.includes(genreId)
      );
      return {
        ...mockMoviesResponse,
        results: filteredMovies,
        total_results: filteredMovies.length
      };
    }
    
    try {
      const response = await tmdbApi.get('/discover/movie', {
        params: { 
          with_genres: genreId,
          page,
          sort_by: 'popularity.desc'
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes por gênero, usando dados mock:', error);
      return mockMoviesResponse;
    }
  },

  // Obter lista de gêneros
  getGenres: async (): Promise<GenresResponse> => {
    if (!isApiConfigured) {
      console.warn('⚠️ API key não configurada, usando dados mock');
      return mockGenres;
    }
    
    try {
      const response = await tmdbApi.get('/genre/movie/list', {
        params: { language: 'pt-BR' }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar gêneros, usando dados mock:', error);
      return mockGenres;
    }
  },

  // Obter detalhes de um filme
  getMovieDetails: async (id: number): Promise<MovieDetails> => {
    if (!isApiConfigured) {
      console.warn('⚠️ API key não configurada, usando dados mock');
      return { ...mockMovieDetails, id };
    }
    
    try {
      const response = await tmdbApi.get(`/movie/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme, usando dados mock:', error);
      return { ...mockMovieDetails, id };
    }
  },

  // Obter filmes mais bem avaliados
  getTopRatedMovies: async (page: number = 1): Promise<MoviesResponse> => {
    if (!isApiConfigured) {
      console.warn('⚠️ API key não configurada, usando dados mock');
      return mockMoviesResponse;
    }
    
    try {
      const response = await tmdbApi.get('/movie/top_rated', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados, usando dados mock:', error);
      return mockMoviesResponse;
    }
  },
};

// Função para construir URL de imagem
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.svg';
  if (!isApiConfigured) return '/placeholder-movie.svg';
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
};