"use client";

import CategoryButtons from "@/app/map/_components/CategoryButtons";
import MapContainer from "@/app/map/_components/MapContainer";
import useCategoriesSearch from "@/app/map/_hooks/useCategoriesSearch";
import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import useKakaoMap from "@/app/map/_hooks/useKakaoMap";
import useLocationStore from "@/store/useLocationStore";
import Link from "next/link";

const Map = () => {
  useKakaoLoader();
  const { kakaoLoading } = useLocationStore();

  const {
    mapCenter, // 현재 지도 중심 좌표
    setMapCenter, // 중심 좌표 업데이트 함수
    currentPosition, // 현재 위치
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
    setSelectedMarkerId,
    selectedMarkerId,
  } = useCategoriesSearch(mapCenter);
  return (
    <>
      {!kakaoLoading ? (
        <div className="relative">
          {/* 카테고리 검색 버튼 */}
          <CategoryButtons
            isMain={true}
            setCategory={setCategory}
            setSelectedPlace={setSelectedPlace}
            setPlaceDetail={setPlaceDetail}
          />

          <div className="mx-5 h-[220px] lg:mx-0 lg:h-[505px]">
            <Link href={"/map"}>
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
                setSelectedMarkerId={setSelectedMarkerId}
                selectedMarkerId={selectedMarkerId}
              />
            </Link>
          </div>
          <Link
            href={"/map"}
            className="mt-4 block text-center font-gmarket text-sm text-primary-500 lg:text-lg"
          >
            다른 장소도 궁금하다면?
          </Link>
        </div> 
      ) : (
        "로딩 중..."
      )}
    </>
  );
};

export default Map;
