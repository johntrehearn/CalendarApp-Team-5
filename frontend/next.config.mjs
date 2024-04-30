/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    domains: ["source.unsplash.com", "firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
