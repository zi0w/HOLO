"use client";

import Header from "@/components/layout/Header";
import useCheckAuth from "@/hooks/useCheckAuth";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  useCheckAuth();
  const pathname = usePathname();
  const hideHeader =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");


  return (
    <>
      <Header hidden={hideHeader} />
      <main
        className={clsx(
          "mb-[60px] h-[calc(100vh-120px)] overflow-auto lg:mb-0 lg:ml-[240px] lg:h-auto lg:overflow-visible",
          hideHeader && "lg:ml-0",
        )}
      >
        {children}
      </main>
    </>
  );
};

export default MainContainer;
