"use client";
import SplashIcon from "@/assets/images/splash/splash_Icon.png";
import SplashLogo from "@/assets/images/splash/splash_logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/map");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="mt-[163px] flex h-screen flex-col items-center justify-center">
      <Image
        src={SplashLogo}
        alt="스플래쉬 화면 로고"
        width={343}
        height={165}
      />
      <Image
        src={SplashIcon}
        alt="스플래쉬 화면 캐릭터"
        width={636}
        height={636}
      />
    </div>
  );
};

export default Splash;
