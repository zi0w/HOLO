import KakaoMap from "@/app/map/_components/KakaoMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "우리동네 핫플",
  description: "지도에서 사용자 주변 카테고리 시설 정보를 확인할 수 있습니다.",
  openGraph: {
    title: "우리동네 핫플",
    description:
      "지도에서 사용자 주변 카테고리 시설 정보를 확인할 수 있습니다.",
    url: "https://holo-psi.vercel.app/map",
  },
};
const Map = () => {
  return (
    <div className="my-8">
      <KakaoMap />
    </div>
  );
};

export default Map;
