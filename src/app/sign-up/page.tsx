// app/sign-up/page.tsx
"use client";

import SignUp from "@/app/sign-up/_components/Signup";
import splash_logo from "@/assets/images/splash/splash_logo.png";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex h-[874px] w-[402px] flex-col items-center bg-white">
      <div className="mb-[40px] mt-[80px] flex flex-col items-center">
        <div className="relative">
          <div className="-ml-[20px] mt-[20px]">
            <Image src={splash_logo} alt="로고" width={343} height={165} />
          </div>
        </div>
      </div>
      <SignUp />
    </div>
  );
};

export default Page;
