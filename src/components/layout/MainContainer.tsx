"use client";

import NavigateBack from "@/components/common/NavigateBack";
import Header from "@/components/layout/Header";
import useCheckAuth from "@/hooks/useCheckAuth";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  useCheckAuth();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기에 따라 모바일 여부 판단
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px 이하 → 모바일로 판별
    };

    handleResize(); // 초기 로드 시 화면 크기 체크
    window.addEventListener("resize", handleResize); // 화면 크기 변경 시 체크

    return () => window.removeEventListener("resize", handleResize); // 언마운트 시 이벤트 리스너 해제
  }, []);

  const allHideHeaderPages =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/honeytips/post") ||
    (pathname.startsWith("/recommend") && isMobile) ||
    (pathname.startsWith("/fortune") && isMobile);

  const nonePaddingPages =
    pathname.startsWith("/map") || pathname.startsWith("/recommend");

  return (
    <>
      <Header allHidden={allHideHeaderPages} />
      <NavigateBack />
      <main
        className={clsx(
          "lg:ml-[254px] lg:h-screen lg:pb-0",
          allHideHeaderPages && "!pb-0 lg:!ml-0",
          nonePaddingPages && "!pb-0 lg:!h-auto",
        )}
      >
        {children}
      </main>
    </>
  );
};

export default MainContainer;
