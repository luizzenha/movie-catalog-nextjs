import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // cacheComponents: true, // Desabilitado temporariamente para evitar conflitos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
};

export default nextConfig;
