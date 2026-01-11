import { Movie, MovieDetails, MoviesResponse } from '@/types/movie';

// Dados mock para demonstração quando a API key não estiver configurada
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Filme de Ação Exemplo",
    overview: "Esta é uma sinopse de exemplo para demonstrar o layout do catálogo de filmes de ação.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-01-15",
    vote_average: 8.5,
    vote_count: 1250,
    genre_ids: [28, 12], // Ação, Aventura
    adult: false,
    original_language: "en",
    original_title: "Action Example Movie",
    popularity: 85.5,
    video: false
  },
  {
    id: 2,
    title: "Comédia Romântica Exemplo",
    overview: "Uma comédia romântica de exemplo para mostrar como os filmes são exibidos na grade.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-02-20",
    vote_average: 7.8,
    vote_count: 890,
    genre_ids: [35, 10749], // Comédia, Romance
    adult: false,
    original_language: "en",
    original_title: "Romantic Comedy Example",
    popularity: 72.3,
    video: false
  },
  {
    id: 3,
    title: "Drama Familiar Exemplo",
    overview: "Terceiro exemplo de filme para preencher a grade e demonstrar o layout responsivo.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-03-10",
    vote_average: 9.1,
    vote_count: 2100,
    genre_ids: [18, 10751], // Drama, Família
    adult: false,
    original_language: "en",
    original_title: "Family Drama Example",
    popularity: 95.7,
    video: false
  },
  {
    id: 4,
    title: "Ficção Científica Exemplo",
    overview: "Um filme de ficção científica futurista com efeitos especiais incríveis.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-04-05",
    vote_average: 8.2,
    vote_count: 1580,
    genre_ids: [878, 28], // Ficção Científica, Ação
    adult: false,
    original_language: "en",
    original_title: "Sci-Fi Example Movie",
    popularity: 88.9,
    video: false
  },
  {
    id: 5,
    title: "Terror Psicológico Exemplo",
    overview: "Um thriller psicológico que vai manter você na beira do assento.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-05-12",
    vote_average: 7.5,
    vote_count: 967,
    genre_ids: [27, 53], // Terror, Thriller
    adult: false,
    original_language: "en",
    original_title: "Psychological Horror Example",
    popularity: 76.4,
    video: false
  },
  {
    id: 6,
    title: "Animação Infantil Exemplo",
    overview: "Uma animação divertida para toda a família com personagens cativantes.",
    poster_path: null,
    backdrop_path: null,
    release_date: "2024-06-18",
    vote_average: 8.8,
    vote_count: 2340,
    genre_ids: [16, 10751, 35], // Animação, Família, Comédia
    adult: false,
    original_language: "en",
    original_title: "Kids Animation Example",
    popularity: 92.1,
    video: false
  }
];

export const mockMovieDetails: MovieDetails = {
  ...mockMovies[0],
  genres: [
    { id: 28, name: "Ação" },
    { id: 12, name: "Aventura" }
  ],
  runtime: 142,
  budget: 150000000,
  revenue: 500000000,
  production_companies: [
    {
      id: 1,
      logo_path: null,
      name: "Exemplo Studios",
      origin_country: "US"
    }
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "Estados Unidos"
    }
  ],
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English"
    }
  ],
  status: "Released",
  tagline: "Um filme de exemplo incrível"
};

export const mockMoviesResponse: MoviesResponse = {
  page: 1,
  results: mockMovies,
  total_pages: 1,
  total_results: mockMovies.length
};