import SignInForm from "@/app/sign-in/_components/Signin";
import splash_logo from "@/assets/images/splash/splash_logo.png";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HoLo 로그인 페이지",
  description: "HoLo 에서 HoLo 지내는 친구들 찾아보세요.",
  openGraph: {
    title: "로그인페이지",
    description:
      "로그인 을 통해 HoLo 여러가지 서비스를 체험함수있습니다.",
    url: "https://holo-psi.vercel.app/sign-in",
  },
};
const Page = () => {
  return (
    <div className="flex flex-col items-center bg-base-50">
      <div className="mb-[40px] flex flex-col items-center">
        <div className="relative">
          <div className="-ml-[20px] mt-[20px]">
            <Image 
              src={splash_logo} 
              alt="로고" 
              width={343} 
              height={165}
            />
          </div>
        </div>
      </div>
      <SignInForm/>
    </div>
  );
};

export default Page;