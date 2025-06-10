import Mypageform from "@/app/mypage/_components/MypageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 - 사용자 이름",
  description: "HoLo 에서 나의 발자취를 확인 할수있는 마이페이지 입니다",
  openGraph: {
    title: "마이페이지 - 사용자 이름",
    description: "HoLo 에서 나의 발자취를 확인 할수있는 마이페이지 입니다.",
    url: `${process.env.NEXT_PUBLIC_API_URL}/mypage`,
  },
};

const page = () => {
  return (
    <div className="w-full">
      <Mypageform />
    </div>
  );
};

export default page;
