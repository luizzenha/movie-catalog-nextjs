# Movie Catalog - Teste de Performance Next.js

Este projeto demonstra diferentes estratégias de renderização do Next.js (SSG, SSR, PPR) usando a API do The Movie Database (TMDB).

Todo o projeto foi gerado utilizando AI. Claude Sonnet 4 com IDE Kiro

## 🚀 Funcionalidades

- **Página Inicial (SSG)**: Lista de filmes populares e mais bem avaliados gerada em build time
- **Busca (SSR)**: Busca de filmes renderizada no servidor a cada request
- **Gêneros (SSG)**: Navegação por gêneros com páginas pré-renderizadas para cada categoria
- **Dashboard (PPR)**: Demonstração de Partial Prerendering combinando conteúdo estático e dinâmico

## 🛠️ Tecnologias

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Axios
- TMDB API

## 📋 Pré-requisitos

1. Node.js 18+ instalado
2. Conta no [The Movie Database (TMDB)](https://www.themoviedb.org/)
3. API Key do TMDB

## 🔧 Configuração

1. **Clone o repositório e instale as dependências:**
   ```bash
   cd movie-catalog
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   
   Edite o arquivo `.env.local` e adicione sua API key do TMDB:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=sua_api_key_aqui
   TMDB_API_KEY=sua_api_key_aqui
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

3. **Para obter a API Key do TMDB:**
   - Crie uma conta em https://www.themoviedb.org/
   - Vá para Settings > API
   - Solicite uma API Key (gratuita)

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Build e Produção
```bash
npm run build
npm start
```

## 📊 Estratégias de Renderização

### 1. SSG (Static Site Generation) - Página Inicial (`/`) e Gêneros (`/genres`)
- **Quando usar**: Conteúdo que não muda frequentemente
- **Vantagens**: Máxima performance, SEO otimizado
- **Como funciona**: Dados são buscados em build time
- **Exemplos**: 
  - Lista de filmes populares
  - Páginas de gêneros e filmes por gênero

### 2. SSR (Server Side Rendering) - Busca (`/search`)
- **Quando usar**: Conteúdo dinâmico baseado em parâmetros do usuário
- **Vantagens**: Sempre atualizado, SEO bom
- **Como funciona**: Dados são buscados a cada request
- **Exemplo**: Resultados de busca

### 3. PPR (Partial Prerendering) - Dashboard (`/dashboard`)
- **Quando usar**: Páginas que precisam de conteúdo estático E dinâmico
- **Vantagens**: Carregamento instantâneo + personalização
- **Como funciona**: Combina partes estáticas (pré-renderizadas) com partes dinâmicas (Suspense)
- **Exemplo**: Dashboard com layout estático e widgets dinâmicos

## 🔍 Testando Performance

### Métricas para Observar:

1. **Time to First Byte (TTFB)**
   - SSG: ~50-100ms (muito rápido)
   - SSR: ~200-500ms (mais lento)
   - PPR: ~50-100ms para partes estáticas, dinâmico para partes com Suspense

2. **Largest Contentful Paint (LCP)**
   - SSG: Melhor performance
   - SSR: Performance variável
   - PPR: Excelente para conteúdo estático, progressivo para dinâmico

3. **Cache Behavior**
   - SSG: Cache indefinido até próximo build
   - SSR: Sem cache (sempre fresh)
   - PPR: Partes estáticas cached, partes dinâmicas fresh

4. **User Experience**
   - SSG: Carregamento instantâneo, mas não personalizado
   - SSR: Personalizado, mas pode ser lento
   - PPR: Carregamento instantâneo + personalização progressiva

### Ferramentas de Teste:

1. **Chrome DevTools**
   - Network tab para ver tempos de carregamento
   - Lighthouse para métricas de performance

2. **Next.js Build Analyzer**
   ```bash
   npm run build
   # Observe os ícones: ○ (SSG), ● (SSR), ◐ (ISR)
   ```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx              # Página inicial (SSG)
│   ├── search/page.tsx       # Busca (SSR)
│   ├── genres/
│   │   ├── page.tsx          # Lista de gêneros (SSG)
│   │   └── [id]/page.tsx     # Filmes por gênero (SSG)
│   └── dashboard/page.tsx    # Dashboard (PPR)
├── components/
│   ├── MovieCard.tsx         # Card do filme
│   ├── MovieGrid.tsx         # Grade de filmes
│   ├── SearchBar.tsx         # Barra de busca
│   ├── Navigation.tsx        # Navegação
│   ├── UserStats.tsx         # Estatísticas do usuário (PPR)
│   ├── PersonalizedRecommendations.tsx  # Recomendações (PPR)
│   └── TrendingNow.tsx       # Trending em tempo real (PPR)
├── lib/
│   ├── tmdb.ts              # Serviço da API
│   └── mock-data.ts         # Dados mock para desenvolvimento
└── types/
    ├── movie.ts             # Tipos TypeScript para filmes
    └── genre.ts             # Tipos TypeScript para gêneros
```

## 🎯 Casos de Uso Reais

- **E-commerce**: Catálogo de produtos (SSG), Busca (SSR), Dashboard do usuário (PPR)
- **Blog**: Posts por categoria (SSG), Busca de artigos (SSR), Dashboard do autor (PPR)
- **Plataforma de Cursos**: Cursos por categoria (SSG), Busca de cursos (SSR), Dashboard do aluno (PPR)

## 💡 Exemplo de "Busca" com SSG

O projeto demonstra como criar uma experiência de "busca" usando SSG:

1. **Gêneros como Filtros**: Cada gênero é uma página estática pré-renderizada
2. **Performance Máxima**: Navegação instantânea entre categorias
3. **SEO Otimizado**: Cada página de gênero é indexável
4. **Escalabilidade**: Funciona bem mesmo com milhares de categorias

Esta abordagem é ideal para:
- Catálogos de produtos com categorias fixas
- Blogs com tags predefinidas
- Plataformas de conteúdo com classificações estáveis

## 📈 Próximos Passos

- Implementar paginação infinita
- Adicionar filtros avançados
- Implementar cache Redis para SSR
- Adicionar testes de performance automatizados
- Implementar Service Worker para cache offline