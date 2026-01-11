import { tmdbService } from '@/lib/tmdb';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';

// SSG - Static Site Generation
export default async function Home() {
  // Dados são buscados em build time
  const popularMovies = await tmdbService.getPopularMovies();
  const topRatedMovies = await tmdbService.getTopRatedMovies();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Catálogo de Filmes
          </h1>
          <p className="text-gray-600 mb-8">
            Página principal usando SSG (Static Site Generation)
          </p>
          <SearchBar />
        </header>

        <main className="space-y-12">
          <section>
            <MovieGrid 
              movies={popularMovies.results} 
              title="Filmes Populares" 
            />
          </section>

          <section>
            <MovieGrid 
              movies={topRatedMovies.results} 
              title="Mais Bem Avaliados" 
            />
          </section>
        </main>

        <footer className="mt-16 text-center text-gray-500">
          <p>Dados fornecidos por The Movie Database (TMDB)</p>
        </footer>
      </div>
    </div>
  );
}