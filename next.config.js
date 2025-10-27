/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Avoid native lightningcss in case it creeps back via tooling
    optimizeCss: false,
  },
  reactStrictMode: true,
  
};

console.log('✅ SANITY PROJECT ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

module.exports = nextConfig;