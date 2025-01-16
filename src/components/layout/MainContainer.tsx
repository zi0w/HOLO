"use client";

import Header from "@/components/layout/Header";
import Nav from "@/components/layout/Nav";
import useCheckAuth from "@/hooks/useCheckAuth";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  useCheckAuth();
  const pathname = usePathname();
  const hideHeader =
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up") ||
    pathname?.startsWith("/map");

  return (
    <>
      <Header hidden={hideHeader} />
      {pathname.startsWith("/map") && <Nav />}
      <main
        className={clsx(
          "mb-[60px] h-[calc(100vh-120px)] overflow-auto lg:mb-0 lg:ml-[240px] lg:h-auto lg:overflow-visible",
          hideHeader && "h-full lg:ml-0",
        )}
      >
        {children}
      </main>
    </>
  );
};

export default MainContainer;
