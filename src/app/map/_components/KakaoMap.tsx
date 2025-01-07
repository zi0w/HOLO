"use client";

import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoMap from "../_hooks/useKakaoMap";

const KakaoMap = () => {
  useKakaoLoader();
  const {
    mapCenter,
    setMapCenter,
    currentPosition,
    onClickGetCurrentPosition,
  } = useKakaoMap();

  return (
    <div>
      <Map // 지도를 표시할 Container
        center={mapCenter}
        style={{
          // 지도의 크기
          width: "100%",
          height: "90vh",
        }}
        level={3} // 지도의 확대 레벨
        onCenterChanged={(map) => {
          // 사용자가 지도를 드래그로 이동하면 현재 지도 중심 업데이트
          const center = map.getCenter();
          setMapCenter({
            lat: center.getLat(),
            lng: center.getLng(),
          });
        }}
      >
        {currentPosition && <MapMarker position={currentPosition} />}
      </Map>
      <button onClick={onClickGetCurrentPosition}>내 위치</button>
    </div>
  );
};
export default KakaoMap;
