import SignUp from "@/app/sign-up/_components/Signup";
import authavatar from "@/assets/images/auth/authavatar.png";
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
    <div className="h-full w-full bg-white">
      <div className="mx-auto flex h-full w-full flex-col items-center lg:flex-row lg:justify-center lg:gap-20">
        <div className="hidden lg:block mt-auto">
          <Image
            src={authavatar}
            alt="캐릭터 아바타"
            width={590}
            height={913}
            className="max-h-[800px] object-contain"
            // style={{
            //   maxWidth: "100%",
            //   height: "auto",
            //   // marginTop: "55px",
            // }}
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
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Page;
