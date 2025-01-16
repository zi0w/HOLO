import KakaoMap from "@/app/map/_components/KakaoMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 주변 시설 정보",
  description: "지도에서 사용자 주변 카테고리 시설 정보를 확인할 수 있습니다.",
  openGraph: {
    title: "내 주변 시설",
    description:
      "지도에서 사용자 주변 카테고리 시설 정보를 확인할 수 있습니다.",
    url: "http://localhost:3000",
  },
};
const Map = () => {
  return (
    <>
      <div className="font-gmarket mx-5 my-4 text-2xl font-bold">
        우리동네 핫플
      </div>
      <KakaoMap />
    </>
  );
};

export default Map;
