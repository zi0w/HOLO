"use client";

import useLocationStore from "@/store/useLocationStore";
import { useEffect } from "react";
import { useKakaoLoader as kakaoLoader } from "react-kakao-maps-sdk";

const useKakaoLoader = () => {
  const { setKakaoLoading } = useLocationStore();
  const [loading] = kakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY!,
    libraries: ["services"],
  });

  useEffect(() => {
    if (!loading) {
      setKakaoLoading(false);
    }
  }, [loading, setKakaoLoading]);
};

export default useKakaoLoader;
