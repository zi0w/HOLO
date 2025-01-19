/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "eqanvaummffjgxyujqru.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net", // 카카오 CDN
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google 프로필 이미지 호스트
        pathname: "/**", // 모든 경로 허용
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
