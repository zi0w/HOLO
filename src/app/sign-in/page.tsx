import SignInForm from "@/app/sign-in/_components/Signin";
import authavatar from "@/assets/images/auth/authavatar.png";
import splash_logo from "@/assets/images/splash/splash_logo.png";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "HoLo 로그인 페이지",
  description: "HoLo 에서 HoLo 지내는 친구들 찾아보세요.",
  openGraph: {
    title: "로그인페이지",
    description: "로그인 을 통해 HoLo 여러가지 서비스를 체험함수있습니다.",
    url: `${process.env.NEXT_PUBLIC_API_URL}/sign-in`,
  },
};

const Page = () => {
  return (
    <div className="h-screen w-full bg-white">
      <div className="mx-auto flex h-full w-full flex-col items-center lg:flex-row lg:justify-center lg:gap-20">
        <div className="mt-auto hidden lg:block">
          <Image
            src={authavatar}
            alt="캐릭터 아바타"
            width={590}
            height={913}
            className="max-h-[800px] object-contain"
            priority
          />
        </div>
        <div className="pt-14 lg:my-auto lg:pt-0">
          <div className="mb-[40px] flex flex-col items-center lg:mb-0">
            <div className="relative">
              <div className="-ml-[20px] mt-[20px] lg:mt-0">
                <Image src={splash_logo} alt="로고" width={343} height={165} />
              </div>
            </div>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
