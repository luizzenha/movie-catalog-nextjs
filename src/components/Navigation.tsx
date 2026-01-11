import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            🎬 Movie Catalog
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Início (SSG)
            </Link>
            <Link 
              href="/search" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Buscar (SSR)
            </Link>
            <Link 
              href="/genres" 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Gêneros (SSG)
            </Link>
            <Link 
              href="/dashboard" 
              className="text-purple-600 hover:text-purple-800 transition-colors font-semibold"
            >
              Dashboard (PPR)
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}