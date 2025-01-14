"use client";

import useCheckAuth from "@/app/hooks/useCheckAuth";
import HeaderContent from "@/components/common/HeaderContent";
import { usePathname } from "next/navigation";

const Header = () => {

  const pathname = usePathname();
  useCheckAuth();


  if (pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")) {
    return <HeaderContent hidden={true} />;
  }

  return <HeaderContent hidden={false} />;
};

export default Header;
