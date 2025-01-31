import locationStore from "@/store/useLocationStore";
import { useEffect } from "react";

const useKakaoMap = () => {
  const {
    currentPosition,
    mapCenter,
    mapLevel,
    geolocationError,
    setMapCenter,
    onClickPlusMapLevel,
    onClickMinusMapLevel,
    onClickMoveCurrentPosition,
  } = locationStore();

  useEffect(() => {
    onClickMoveCurrentPosition();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (currentPosition) {
        setMapCenter(currentPosition);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPosition, setMapCenter]);
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
