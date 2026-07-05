/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // slim Docker image (server + minimal deps only)
  images: {
    unoptimized: true, // Disables Next.js Image Optimization to mitigate CVEs
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
