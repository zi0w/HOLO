"use client";

import Header from "@/components/layout/Header";
import Nav from "@/components/layout/Nav";
import useCheckAuth from "@/hooks/useCheckAuth";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  useCheckAuth();
  const pathname = usePathname();
  const allHideHeaderPages =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const trashPage = pathname.startsWith("/trash-guide");
  const mapPage = pathname.startsWith("/map");
  const mobileHideHeaderPages = mapPage || trashPage;

  return (
    <>
      <Header
        allHidden={allHideHeaderPages}
        mobileHidden={mobileHideHeaderPages}
      />
      {(mapPage || trashPage) && <Nav isMobile={true} />}
      <main
        className={clsx(
          "pb-[60px] lg:ml-[240px] lg:h-screen",
          allHideHeaderPages && "lg:!ml-0",
          trashPage && "h-screen bg-orange-50 pb-12 lg:pb-0",
          mapPage && "!pb-0 lg:!h-auto",
        )}
      >
        {children}
      </main>
    </>
  );
};

export default MainContainer;
