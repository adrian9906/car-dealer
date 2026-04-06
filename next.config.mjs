/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de webpack (funciona en Next.js 14)
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Excluir Prisma del bundle del cliente
      config.externals.push({
        "@libsql/client": "@libsql/client",
        "@prisma/client": "@prisma/client",
      });
    }
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Deshabilitar Turbopack explícitamente
  experimental: {
    turbo: false, // Esto evita que Turbopack se active
  },
};

export default nextConfig;