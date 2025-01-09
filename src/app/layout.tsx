import Header from "@/components/layout/Header";
import TQProvider from "@/components/providers/TQProvider";
import type { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body>
        <Header />
        <TQProvider>
          <main className="mb-[60px] h-[calc(100vh-120px)] overflow-auto lg:mb-0 lg:ml-[240px] lg:h-auto lg:overflow-visible">
            {children}
          </main>
        </TQProvider>
      </body>
    </html>
  );
};

export default RootLayout;
