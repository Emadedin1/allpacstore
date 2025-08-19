/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Avoid native lightningcss in case it creeps back via tooling
    optimizeCss: false,
  },
  reactStrictMode: true,
};


module.exports = nextConfig;