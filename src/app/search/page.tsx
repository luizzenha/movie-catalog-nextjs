import { tmdbService } from '@/lib/tmdb';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

// SSR - Server Side Rendering
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const page = parseInt(params.page || '1');

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Buscar Filmes
            </h1>
            <p className="text-gray-600 mb-8">
              Página de busca usando SSR (Server Side Rendering)
            </p>
            <SearchBar />
          </header>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">Digite algo para buscar filmes</p>
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dados são buscados a cada request (SSR)
  const searchResults = await tmdbService.searchMovies(query, page);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Buscar Filmes
          </h1>
          <p className="text-gray-600 mb-8">
            Página de busca usando SSR (Server Side Rendering)
          </p>
          <SearchBar initialQuery={query} />
        </header>

        <main>
          {searchResults.results.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Encontrados {searchResults.total_results} resultados para "{query}"
                </p>
              </div>
              <MovieGrid movies={searchResults.results} />
              
              {/* Paginação simples */}
              <div className="flex justify-center mt-12 space-x-4">
                {page > 1 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Página Anterior
                  </Link>
                )}
                
                <span className="px-4 py-2 bg-gray-200 rounded">
                  Página {page} de {searchResults.total_pages}
                </span>
                
                {page < searchResults.total_pages && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Próxima Página
                  </Link>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Nenhum filme encontrado para "{query}"
              </p>
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Voltar para a página inicial
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}