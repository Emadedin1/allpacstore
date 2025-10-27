/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    optimizeCss: false,
  },
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@sanity': path.resolve(__dirname, 'src/sanity'),
    };
    return config;
  },
};

module.exports = nextConfig;
