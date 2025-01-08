"use client";

import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import useKakaoMap from "@/app/map/_hooks/useKakaoMap";

import useCategoriesSearch from "@/app/map/_hooks/useCategoriesSearch";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  useKakaoLoader();

  const {
    mapCenter, // 현재 지도 중심 좌표
    setMapCenter, // 중심 좌표 업데이트 함수
    currentPosition, // 현재 위치
  } = useKakaoMap();

  const { setCategory, places, onClickMoveCurrentPosition } =
    useCategoriesSearch(currentPosition, setMapCenter);
  return (
    <div>
      <div className="flex justify-center space-x-4">
        {[
          "다이소",
          "병원",
          "약국",
          "세탁소",
          "미용실",
          "편의점",
          "은행",
          "주민센터",
          "카페",
          "헬스장",
        ].map((item) => (
          <button key={item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      <Map
        center={mapCenter || currentPosition} // 지도를 내 위치 기준으로 표시
        className="h-[80vh] w-[100%]"
        level={4} // 지도의 확대 레벨
        onCenterChanged={(map) => {
          // 사용자가 지도를 드래그로 이동하면 현재 지도 중심 업데이트
          const center = map.getCenter();
          setMapCenter({
            lat: center.getLat(),
            lng: center.getLng(),
          });
        }}
      >
        {" "}
        {/* 검색된 장소 마커 표시 */}
        {places.map((place) => (
          <MapMarker
            key={place.id}
            position={{
              lat: parseFloat(place.y),
              lng: parseFloat(place.x),
            }}
          >
            {place.place_name}
          </MapMarker>
        ))}
        {currentPosition && (
          <MapMarker position={currentPosition}>
            <div>내 위치</div>
          </MapMarker>
        )}
        <button onClick={onClickMoveCurrentPosition}>내 위치</button>
      </Map>
      {/* 리스트 출력 */}
      <div>
        {places.map((place) => (
          <div
            key={place.id}
            onClick={() =>
              setMapCenter({
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              })
            }
          >
            <p>{place.place_name}</p>
            {place.address_name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default KakaoMap;
