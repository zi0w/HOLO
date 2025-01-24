// app/sign-up/page.tsx


import SignUp from "@/app/sign-up/_components/Signup";
import splash_logo from "@/assets/images/splash/splash_logo.png";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "HoLo 회원가입 페이지",
  description: "HoLo 에서 HoLo 의 구성원이 되어보세요.",
  openGraph: {
    title: "회원가입 페이지",
    description: "회원가입 을 통해 HoLo 의 구성원 이 될수있습니다.",
    url: "https://holo-psi.vercel.app/sign-up",
  },
};

const Page = () => {
  return (
    <div className="flex flex-col items-center bg-white">
      <div className="mb-[40px] flex flex-col items-center">
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
