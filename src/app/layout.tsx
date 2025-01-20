import "@/app/globals.css";
import MainContainer from "@/components/layout/MainContainer";
import TQProvider from "@/components/providers/TQProvider";
import type { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const metadata: Metadata = {
  title: "HOLO",
  description: "1인가구를 위한 정보 제공 서비스, 나 HOLO 산다!",
  openGraph: {
    title: "오늘의 운세 뽑기",
    description: "1인가구를 위한 정보 제공 서비스, 나 HOLO 산다!",
    url: "https://localhost:3000",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body>
        <TQProvider>
          <MainContainer>{children}</MainContainer>
        </TQProvider>
      </body>
    </html>
  );
};

export default RootLayout;
