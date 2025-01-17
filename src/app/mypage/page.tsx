import Mypageform from "@/app/mypage/_components/mypageform";
import { Metadata } from "next"; // 필요한 경우 import

export const metadata: Metadata = {
  title: "마이페이지 - 사용자 이름",
  description: "사용자의 개인 정보를 확인하고 관리할 수 있는 마이페이지입니다.",
  openGraph: {
    title: "마이페이지 - 사용자 이름",
    description: "사용자의 개인 정보를 확인하고 관리할 수 있는 마이페이지입니다.",
    url: "https://localhost:3000/mypage", // 실제 URL로 변경
  },
};

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="-mt-2 flex pl-4">
        <h1 className="mb-6 text-2xl font-bold text-base-800">마이페이지</h1>
      </div>
      <Mypageform />
    </div>
  );
};

export default page;
