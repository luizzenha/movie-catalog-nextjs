import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tmdbService } from '@/lib/tmdb';
import MovieGrid from '@/components/MovieGrid';

interface GenrePageProps {
  params: Promise<{ id: string }>;
}

// SSG - Static Site Generation
export default async function GenrePage({ params }: GenrePageProps) {
  const { id } = await params;
  const genreId = parseInt(id);

  if (isNaN(genreId)) {
    notFound();
  }

  try {
    // Dados são buscados em build time para cada gênero
    const [genresData, moviesData] = await Promise.all([
      tmdbService.getGenres(),
      tmdbService.getMoviesByGenre(genreId)
    ]);

    const genre = genresData.genres.find(g => g.id === genreId);

    if (!genre) {
      notFound();
    }

    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Início
              </Link>
              <span className="text-gray-500">›</span>
              <Link 
                href="/genres" 
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Gêneros
              </Link>
              <span className="text-gray-500">›</span>
              <span className="text-gray-700">{genre.name}</span>
            </div>
          </nav>

          <header className="text-center mb-12">
            <div className="text-6xl mb-4">
              {getGenreEmoji(genre.name)}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Filmes de {genre.name}
            </h1>
            <p className="text-gray-600 mb-8">
              Página usando SSG (Static Site Generation) - Filmes pré-renderizados por gênero
            </p>
            <div className="text-sm text-gray-500 bg-green-50 rounded-lg p-3 max-w-2xl mx-auto">
              <strong>SSG com parâmetros dinâmicos:</strong> Esta página foi gerada em build time
              <br />
              usando <code>generateStaticParams</code> para criar uma página estática para cada gênero.
            </div>
          </header>

          <main>
            {moviesData.results.length > 0 ? (
              <>
                <MovieGrid 
                  movies={moviesData.results} 
                  title={`${moviesData.total_results} filmes encontrados`}
                />
                
                {/* Informações sobre a implementação */}
                <section className="mt-16 bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Como funciona esta "busca" com SSG
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Build Time</h3>
                      <ul className="space-y-1">
                        <li>1. Next.js executa <code>generateStaticParams</code></li>
                        <li>2. Gera uma página para cada gênero</li>
                        <li>3. Busca filmes de cada gênero na API</li>
                        <li>4. Cria arquivos HTML estáticos</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Runtime</h3>
                      <ul className="space-y-1">
                        <li>1. Usuário clica no gênero</li>
                        <li>2. Servidor entrega HTML pré-gerado</li>
                        <li>3. Carregamento instantâneo</li>
                        <li>4. Sem chamadas de API necessárias</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Resultado:</strong> Experiência de "busca" com performance de página estática!
                    </p>
                  </div>
                </section>
              </>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Nenhum filme encontrado para o gênero {genre.name}
                </p>
                <Link 
                  href="/genres" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Voltar para gêneros
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erro ao buscar filmes do gênero:', error);
    notFound();
  }
}

// Gera páginas estáticas para todos os gêneros
export async function generateStaticParams() {
  try {
    const genresData = await tmdbService.getGenres();
    
    return genresData.genres.map((genre) => ({
      id: genre.id.toString(),
    }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos para gêneros:', error);
    return [];
  }
}

// Função para mapear gêneros para emojis
function getGenreEmoji(genreName: string): string {
  const emojiMap: { [key: string]: string } = {
    'Ação': '💥',
    'Aventura': '🗺️',
    'Animação': '🎨',
    'Comédia': '😂',
    'Crime': '🔫',
    'Documentário': '📹',
    'Drama': '🎭',
    'Família': '👨‍👩‍👧‍👦',
    'Fantasia': '🧙‍♂️',
    'História': '📜',
    'Terror': '👻',
    'Música': '🎵',
    'Mistério': '🔍',
    'Romance': '💕',
    'Ficção Científica': '🚀',
    'Cinema TV': '📺',
    'Thriller': '😱',
    'Guerra': '⚔️',
    'Faroeste': '🤠'
  };
  
  return emojiMap[genreName] || '🎬';
}