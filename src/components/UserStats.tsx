import { Suspense } from 'react';

// Componente que simula dados dinâmicos do usuário
async function UserStatsContent() {
  // Simula uma chamada de API lenta para dados do usuário
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const userStats = {
    watchedMovies: Math.floor(Math.random() * 100) + 50,
    favoriteGenre: ['Ação', 'Drama', 'Comédia', 'Ficção Científica'][Math.floor(Math.random() * 4)],
    averageRating: (Math.random() * 2 + 3).toFixed(1),
    lastActivity: new Date().toLocaleString('pt-BR'),
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Suas Estatísticas
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {userStats.watchedMovies}
          </div>
          <div className="text-sm text-gray-600">Filmes Assistidos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {userStats.averageRating}
          </div>
          <div className="text-sm text-gray-600">Avaliação Média</div>
        </div>
        <div className="col-span-2 text-center">
          <div className="text-lg font-semibold text-purple-600">
            {userStats.favoriteGenre}
          </div>
          <div className="text-sm text-gray-600">Gênero Favorito</div>
        </div>
        <div className="col-span-2 text-center text-xs text-gray-500">
          Última atividade: {userStats.lastActivity}
        </div>
      </div>
    </div>
  );
}

function UserStatsLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Suas Estatísticas
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="text-sm text-gray-600">Filmes Assistidos</div>
        </div>
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="text-sm text-gray-600">Avaliação Média</div>
        </div>
        <div className="col-span-2 text-center">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="text-sm text-gray-600">Gênero Favorito</div>
        </div>
        <div className="col-span-2 text-center">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function UserStats() {
  return (
    <Suspense fallback={<UserStatsLoading />}>
      <UserStatsContent />
    </Suspense>
  );
}