/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // OneDrive locks files during webpack's atomic-rename cache writes,
  // which causes ENOENT crashes in dev. Disabling the disk cache makes
  // rebuilds ~1-3s slower but eliminates the race entirely.
  // Production builds (`next build`) are unaffected.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
