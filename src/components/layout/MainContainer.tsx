"use client";

import NavigateBack from "@/components/common/NavigateBack";
import Header from "@/components/layout/Header";
import useCheckAuth from "@/hooks/useCheckAuth";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  useCheckAuth();
  const pathname = usePathname();
  const allHideHeaderPages =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/recommend") ||
    pathname.startsWith("/honeytips/post");
  const nonePaddingPages =
    pathname.startsWith("/map") || pathname.startsWith("/recommend");

  return (
    <>
      <Header allHidden={allHideHeaderPages} />
      
      <NavigateBack />
      <main
        className={clsx(
          "lg:ml-[240px] lg:h-screen lg:pb-0",
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
