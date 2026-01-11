import { Suspense } from 'react';
import { tmdbService } from '@/lib/tmdb';
import MovieCard from './MovieCard';

// Componente que busca recomendações personalizadas
async function RecommendationsContent() {
  // Simula uma chamada de API para recomendações personalizadas
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Para demonstração, vamos buscar filmes populares como "recomendações"
  const recommendations = await tmdbService.getPopularMovies();
  
  // Pega apenas os primeiros 4 filmes
  const personalizedMovies = recommendations.results.slice(0, 4);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recomendações Personalizadas
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {personalizedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Baseado no seu histórico de visualização • Atualizado em tempo real
      </p>
    </div>
  );
}

function RecommendationsLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recomendações Personalizadas
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-[2/3] rounded-lg mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mt-4"></div>
    </div>
  );
}

export default function PersonalizedRecommendations() {
  return (
    <Suspense fallback={<RecommendationsLoading />}>
      <RecommendationsContent />
    </Suspense>
  );
}