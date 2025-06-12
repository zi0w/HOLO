import "@/app/globals.css";
import MainContainer from "@/components/layout/MainContainer";
import TQProvider from "@/components/providers/TQProvider";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FF7600",
};

export const metadata: Metadata = {
  title: "HOLO",
  description: "1인가구를 위한 정보 제공 서비스, 나 HOLO 산다!",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HOLO",
  },
  openGraph: {
    title: "HOLO",
    description: "1인가구를 위한 정보 제공 서비스, 나 HOLO 산다!",
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF7600" />
        <link rel="apple-touch-icon" href="/icons/logo.png" />
      </head>
      <body>
        <TQProvider>
          <MainContainer>{children}</MainContainer>
        </TQProvider>
      </body>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="afterInteractive"
      />
    </html>
  );
};

export default RootLayout;
