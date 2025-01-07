import { useEffect, useState } from "react";
import type { Coordinates } from "../_types/coordinates";

const useKakaoMap = () => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(
    null,
  );

  const [mapCenter, setMapCenter] = useState<Coordinates>({
    lat: 37.56675214138411, // 초기 지도 중심 좌표
    lng: 126.97875415079992,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          // 지도 중심 업데이트
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("위치를 가져올 수 없습니다.", error.message);
        },
      );
    } else {
      alert("Geolocation을 사용할 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    // 화면 크기 변경 시 지도 중심 유지
    const handleResize = () => {
      if (currentPosition) {
        // 현재 위치를 지도 중심으로 재설정
        setMapCenter(currentPosition);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPosition]);

  const onClickGetCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCurrentPosition({ lat: latitude, lng: longitude });
          // 지도 중심 업데이트
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("위치를 가져올 수 없습니다.", error.message);
        },
      );
    } else {
      alert("Geolocation을 사용할 수 없습니다.");
    }
  };
  return {
    mapCenter,
    setMapCenter,
    currentPosition,
    onClickGetCurrentPosition,
  };
};

export default useKakaoMap;
