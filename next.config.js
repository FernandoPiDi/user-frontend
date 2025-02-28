/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    forceSwcTransforms: true, // Forzar el uso de SWC incluso con configuración de Babel
  },
};

module.exports = nextConfig;
