/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['via.placeholder.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tjxonwrcuvvfxkfkgadc.supabase.co',
          pathname: '/**',
        },
      ],
    }
  };

export default nextConfig;
