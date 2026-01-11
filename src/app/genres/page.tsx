import Link from 'next/link';
import { tmdbService } from '@/lib/tmdb';

// SSG - Static Site Generation
export default async function GenresPage() {
  // Dados são buscados em build time
  const genresData = await tmdbService.getGenres();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <nav className="mb-6">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Voltar para o catálogo
            </Link>
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Explorar por Gêneros
          </h1>
          <p className="text-gray-600 mb-8">
            Página usando SSG (Static Site Generation) - Gêneros pré-renderizados
          </p>
          <div className="text-sm text-gray-500 bg-green-50 rounded-lg p-3 max-w-2xl mx-auto">
            <strong>SSG em ação:</strong> Esta página e todos os gêneros foram gerados em build time.
            <br />
            Cada link de gênero leva para uma página também pré-renderizada com filmes daquele gênero.
          </div>
        </header>

        <main>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {genresData.genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md p-6 text-center transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-blue-200">
                  <div className="text-4xl mb-3">
                    {getGenreEmoji(genre.name)}
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                    {genre.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    Clique para ver filmes
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Informações sobre SSG */}
          <section className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Por que usar SSG para Gêneros?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Vantagens</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Carregamento instantâneo</li>
                  <li>✅ SEO otimizado</li>
                  <li>✅ Menor carga no servidor</li>
                  <li>✅ Melhor experiência do usuário</li>
                  <li>✅ Funciona offline (com cache)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Ideal para</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>📋 Listas de categorias</li>
                  <li>🏷️ Tags e filtros</li>
                  <li>📄 Páginas de conteúdo estático</li>
                  <li>🗂️ Navegação estruturada</li>
                  <li>📊 Dados que mudam raramente</li>
                </ul>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-16 text-center text-gray-500">
          <p>Gêneros gerados estaticamente em build time</p>
        </footer>
      </div>
    </div>
  );
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