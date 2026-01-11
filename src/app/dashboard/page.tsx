import Link from 'next/link';
import { Suspense } from 'react';
import UserStats from '@/components/UserStats';
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations';
import TrendingNow from '@/components/TrendingNow';

// Componente estático que não faz chamadas de API
function StaticContent() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Header estático */}
                <header className="mb-8">
                    <nav className="mb-6">
                        <Link
                            href="/"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            ← Voltar para o catálogo
                        </Link>
                    </nav>

                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Dashboard do Usuário
                        </h1>
                        <p className="text-gray-600 mb-2">
                            Demonstração de PPR (Partial Prerendering)
                        </p>
                        <div className="text-sm text-gray-500 bg-blue-50 rounded-lg p-3 max-w-2xl mx-auto">
                            <strong>Como funciona o PPR:</strong>
                            <br />
                            • Layout e conteúdo estático são <span className="text-blue-600">pré-renderizados</span> (instantâneo)
                            <br />
                            • Estatísticas, recomendações e trending são <span className="text-green-600">dinâmicos</span> (carregados progressivamente)
                            <br />
                            • Resultado: carregamento instantâneo + dados personalizados
                        </div>
                    </div>
                </header>

                <main className="space-y-8">
                    {/* Grid com conteúdo misto */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Componente dinâmico - carregado no cliente */}
                        <UserStats />

                        {/* Componente dinâmico - carregado no cliente */}
                        <TrendingNow />

                        {/* Widget estático */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Widget Estático
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Este widget é renderizado estaticamente no servidor durante o build.
                                Ele sempre aparece instantaneamente.
                            </p>
                            <div className="mt-4 p-3 bg-gray-50 rounded">
                                <div className="text-2xl font-bold text-gray-800">
                                    1,000+
                                </div>
                                <div className="text-sm text-gray-600">
                                    Filmes no catálogo
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recomendações personalizadas - dinâmico */}
                    <PersonalizedRecommendations />

                    {/* Seção estática de exemplo */}
                    <section className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Conteúdo Estático
                            </h2>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                Pré-renderizado
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-gray-100 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-gray-700 mb-2">
                                        {i * 25}%
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Métrica {i}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Esta seção é pré-renderizada no servidor e sempre carrega instantaneamente
                        </p>
                    </section>

                    {/* Comparação de Performance */}
                    <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Comparação de Estratégias de Renderização
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-2">SSG</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Tudo pré-renderizado
                                </p>
                                <div className="text-xs">
                                    <div className="text-green-600">✓ Muito rápido</div>
                                    <div className="text-red-600">✗ Não personalizado</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-2">SSR</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Tudo no servidor
                                </p>
                                <div className="text-xs">
                                    <div className="text-green-600">✓ Personalizado</div>
                                    <div className="text-red-600">✗ Mais lento</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-2">ISR</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Cache com revalidação
                                </p>
                                <div className="text-xs">
                                    <div className="text-green-600">✓ Rápido</div>
                                    <div className="text-yellow-600">~ Parcialmente atualizado</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-4 shadow-sm border-2 border-purple-200">
                                <h3 className="font-semibold text-purple-800 mb-2">PPR</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    Melhor dos dois mundos
                                </p>
                                <div className="text-xs">
                                    <div className="text-green-600">✓ Rápido</div>
                                    <div className="text-green-600">✓ Personalizado</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="mt-16 text-center text-gray-500">
                    <p>Dashboard demonstrando PPR - Partial Prerendering</p>
                </footer>
            </div>
        </div>
    );
}

// Página principal que usa PPR
export default function DashboardPage() {
    return <StaticContent />;
}