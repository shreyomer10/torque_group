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
  // Canonical host is www.torquegroupcompanies.com. The apex domain is
  // 307-redirected to www at the Vercel domain layer (Settings > Domains),
  // so we do NOT add an app-level redirect here — doing so would create a
  // www -> apex -> www loop (ERR_TOO_MANY_REDIRECTS). Keep this in sync
  // with NEXT_PUBLIC_SITE_URL (= https://www.torquegroupcompanies.com).
};

export default nextConfig;
