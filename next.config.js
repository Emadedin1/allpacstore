/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  experimental: { optimizeCss: false },

  transpilePackages: [
    'sanity',
    'next-sanity',
    '@sanity/vision',
    '@sanity/schema',
    '@sanity/types',
    '@sanity/diff-match-patch',
    '@portabletext/editor',
    '@portabletext/patches'
  ],

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@sanity/types$': require.resolve('@sanity/types'),
      '@sanity/schema$': require.resolve('@sanity/schema'),
      '@sanity/diff-match-patch$': require.resolve('@sanity/diff-match-patch'),
    };
    return config;
  },
};

module.exports = nextConfig;
