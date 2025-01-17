"use client";

import CategoryButtons from "@/app/map/_components/CategoryButtons";
import MapContainer from "@/app/map/_components/MapContainer";
import useCategoriesSearch from "@/app/map/_hooks/useCategoriesSearch";
import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import useKakaoMap from "@/app/map/_hooks/useKakaoMap";
import Link from "next/link";

const Map = () => {
  useKakaoLoader();

  const {
    mapCenter, // 현재 지도 중심 좌표
    setMapCenter, // 중심 좌표 업데이트 함수
    currentPosition, // 현재 위치
    geolocationError,
    mapLevel,
  } = useKakaoMap();

  const {
    setCategory,
    places,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
  } = useCategoriesSearch(mapCenter);

  return (
    <div className="relative">
      {geolocationError && <div>{geolocationError}</div>}

      {/* 카테고리 검색 버튼 */}
      <CategoryButtons
        isMain={true}
        setCategory={setCategory}
        setSelectedPlace={setSelectedPlace}
        setPlaceDetail={setPlaceDetail}
      />

      <div className="mx-5 h-[220px]">
        <MapContainer
          mapCenter={mapCenter}
          currentPosition={currentPosition}
          mapLevel={mapLevel}
          setMapCenter={setMapCenter}
          places={places}
          setSelectedPlace={setSelectedPlace}
          onClickMarker={onClickMarker}
          selectedPlace={selectedPlace}
          placeDetail={placeDetail}
          setPlaceDetail={setPlaceDetail}
          isMain={true}
        />
      </div>
      <Link href={"/map"} className="mt-4 block text-center text-primary-500">
        다른 장소도 궁금하다면?
      </Link>
    </div>
  );
};

export default Map;
