/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["motion", "lenis"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
