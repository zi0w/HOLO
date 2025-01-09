/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tjxonwrcuvvfxkfkgadc.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
