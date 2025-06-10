"use client";

import useLocationStore from "@/store/useLocationStore";
import { useEffect } from "react";
import { useKakaoLoader as kakaoLoader } from "react-kakao-maps-sdk";

const useKakaoLoader = () => {
  const { setKakaoLoading } = useLocationStore();
  const [loading, error] = kakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
    libraries: ["services"],
  });

  useEffect(() => {
    if (!loading) {
      setKakaoLoading(false);
    }
    if (error) {
      throw new Error("카카오 맵 API를 불러오는데 실패하였습니다.");
    }
  }, [loading, error, setKakaoLoading]);
};

export default useKakaoLoader;
