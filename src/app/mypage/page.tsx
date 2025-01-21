import Mypageform from "@/app/mypage/_components/MypageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지 - 사용자 이름",
  description: "사용자의 개인 정보를 확인하고 관리할 수 있는 마이페이지입니다.",
  openGraph: {
    title: "마이페이지 - 사용자 이름",
    description: "사용자의 개인 정보를 확인하고 관리할 수 있는 마이페이지입니다.",
    url: "https://localhost:3000/mypage",
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