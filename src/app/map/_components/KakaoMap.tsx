"use client";

import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  useKakaoLoader();

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "90vh",
      }}
      level={3} // 지도의 확대 레벨
    >
      <MapMarker position={{ lat: 33.450701, lng: 126.570667 }} />
    </Map>
  );
};
export default KakaoMap;
