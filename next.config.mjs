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
      {
        protocol: "http",
        hostname: "k.kakaocdn.net", // 카카오 CDN
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "http",
        hostname: "googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
