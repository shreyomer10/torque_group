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
  // Force the bare (non-www) domain as canonical. Any request to the
  // www host is 308-redirected to the apex domain so Google indexes
  // a single URL. Keep this in sync with NEXT_PUBLIC_SITE_URL.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.torquegroupcompanies.com" }],
        destination: "https://torquegroupcompanies.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
