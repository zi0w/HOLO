import type { Coordinates } from "@/app/map/_types/map";
import { useEffect, useState } from "react";

const useKakaoMap = () => {
  const [currentPosition, setCurrentPosition] = useState<Coordinates | null>(
    null,
  ); // 현재 사용자 위치 상태

  const [geolocationError, setGeolocationError] = useState<string | null>(null); // 에러 상태

  const [mapCenter, setMapCenter] = useState<Coordinates>({
    lat: 37.56675214138411,
    lng: 126.97875415079992,
  }); // 초기 지도 중심 좌표

  const [mapLevel, setMapLevel] = useState<number>(5); // 초기 맵 크기

  const onClickPlusMapLevel = () => {
    setMapLevel((prev) => Math.max(prev - 1, 1));
  };

  const onClickMinusMapLevel = () => {
    setMapLevel((prev) => Math.min(prev + 1, 14));
  };

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
      setGeolocationError("Geolocation을 사용할 수 없습니다.");
    }
  }, [setMapCenter]);

  // 현재 위치 가져오기 함수
  const onClickMoveCurrentPosition = () => {
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
      setGeolocationError("Geolocation을 사용할 수 없습니다.");
    }
  };

  useEffect(() => {
    onClickMoveCurrentPosition();
  }, []);

  useEffect(() => {
    // 화면 크기 변경 시 지도 중심 유지
    const handleResize = () => {
      if (currentPosition) {
        // 현재 위치를 지도 중심으로 재설정
        setMapCenter(currentPosition);
      }
    };

    // resize 이벤트를 통해 화면 크기가 변경될 때 지도 중심을 currentPosition으로 업데이트
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPosition]);
  return {
    mapCenter,
    setMapCenter,
    currentPosition,
    geolocationError,
    mapLevel,
    onClickPlusMapLevel,
    onClickMinusMapLevel,
    onClickMoveCurrentPosition,
  };
};

export default useKakaoMap;
