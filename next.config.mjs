import TerserPlugin from "terser-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.optimization.minimizer.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // console.log 제거
            passes: 3, // 압축 최적화를 3번 반복 (압축률 증가)
          },
          mangle: true, // 변수 및 함수명을 난독화하여 크기 감소
          format: {
            comments: false, // 모든 주석 제거 (파일 크기 줄이기)
          },
        },
        extractComments: false, // 주석을 별도 파일로 분리 X (파일 크기 줄이기)
        parallel: true, // 병렬 실행 활성화 (빌드 속도 최적화)
      }),
    );
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
        hostname: "szwenodhezhbcfhbuckz.supabase.co",
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
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
