import { Suspense } from 'react';

// Componente que simula dados de trending em tempo real
async function TrendingContent() {
  // Simula uma chamada de API para dados de trending
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const trendingData = [
    { title: 'Filme Mais Assistido Hoje', value: 'Exemplo Filme A', change: '+15%' },
    { title: 'Gênero em Alta', value: 'Ficção Científica', change: '+8%' },
    { title: 'Ator Mais Buscado', value: 'Exemplo Ator', change: '+22%' },
    { title: 'Diretor Trending', value: 'Exemplo Diretor', change: '+12%' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Trending Agora
      </h3>
      <div className="space-y-4">
        {trendingData.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">{item.title}</div>
              <div className="font-semibold text-gray-800">{item.value}</div>
            </div>
            <div className="text-green-600 text-sm font-semibold">
              {item.change}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Atualizado a cada 5 minutos • Dados em tempo real
      </p>
    </div>
  );
}

function TrendingLoading() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Trending Agora
      </h3>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between items-center animate-pulse">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </div>
        ))}
      </div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mt-4"></div>
    </div>
  );
}

export default function TrendingNow() {
  return (
    <Suspense fallback={<TrendingLoading />}>
      <TrendingContent />
    </Suspense>
  );
}