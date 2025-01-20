import { useKakaoLoader as kakaoLoader } from "react-kakao-maps-sdk";

const useKakaoLoader = () => {
  kakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
    libraries: ["clusterer", "drawing", "services"],
  });
};

export default useKakaoLoader;
