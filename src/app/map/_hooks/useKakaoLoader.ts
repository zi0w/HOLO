import useLocationStore from "@/store/useLocationStore";
import { useKakaoLoader as kakaoLoader } from "react-kakao-maps-sdk";

const useKakaoLoader = () => {
  const { setKakaoLoading } = useLocationStore();
  const [loading] = kakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
    libraries: ["clusterer", "drawing", "services"],
  });
  if (!loading) {
    setKakaoLoading(false);
  }
};

export default useKakaoLoader;
