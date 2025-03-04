import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true, // Forzar el uso de SWC incluso con configuración de Babel
  },
};

export default nextConfig;
