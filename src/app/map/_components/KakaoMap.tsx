"use client";

import CategoryButtons from "@/app/map/_components/CategoryButtons";
import CategorySkeleton from "@/app/map/_components/CategorySkeleton";
import MapContainer from "@/app/map/_components/MapContainer";
import PlaceList from "@/app/map/_components/PlaceList";
import SkeletonMap from "@/app/map/_components/SkeletonMap";
import useCategoriesSearch from "@/app/map/_hooks/useCategoriesSearch";
import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import useKakaoMap from "@/app/map/_hooks/useKakaoMap";
import useLocationStore from "@/store/useLocationStore";

const KakaoMap = () => {
  useKakaoLoader();

  const {
    kakaoLoading,
    onClickPlusMapLevel, // 지도 확대 함수
    onClickMinusMapLevel, // 지도 축소 함수
    onClickMoveCurrentPosition, // 지도의 위치를 옮겼을 때, 다시 내 위치로 이동 함수
  } = useLocationStore();

  const {
    mapCenter, // 현재 지도 중심 좌표
    setMapCenter, // 중심 좌표 업데이트 함수
    currentPosition, // 현재 위치
    mapLevel,
  } = useKakaoMap();

  const {
    searchPlaces,
    setCategory,
    places,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
    category,
    setSelectedMarkerId,
    selectedMarkerId,
  } = useCategoriesSearch(mapCenter);

  return (
    <>
      <div className="h-[calc(100vh-124px)] lg:ml-28 lg:h-[65vh]">
        {kakaoLoading ? (
          <div className="h-full w-full lg:mt-28">
            <CategorySkeleton />
            <SkeletonMap />
          </div>
        ) : (
          <>
            {/* 카테고리 검색 버튼 */}
            <div className="lg:mt-28">
              <CategoryButtons
                isMain={false}
                setCategory={setCategory}
                setSelectedPlace={setSelectedPlace}
                setPlaceDetail={setPlaceDetail}
              />
            </div>

            <div className="flex h-full flex-row lg:mr-9">
              <>
                <PlaceList
                  places={places}
                  setMapCenter={setMapCenter}
                  setSelectedPlace={setSelectedPlace}
                  onClickMarker={onClickMarker}
                  selectedPlace={selectedPlace}
                  category={category}
                  setSelectedMarkerId={setSelectedMarkerId}
                  onClickPlusMapLevel={onClickPlusMapLevel}
                  onClickMinusMapLevel={onClickMinusMapLevel}
                  onClickMoveCurrentPosition={onClickMoveCurrentPosition}
                />
                <MapContainer
                  searchPlaces={searchPlaces}
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
                  isMain={false}
                  setSelectedMarkerId={setSelectedMarkerId}
                  selectedMarkerId={selectedMarkerId}
                  onClickPlusMapLevel={onClickPlusMapLevel}
                  onClickMinusMapLevel={onClickMinusMapLevel}
                  onClickMoveCurrentPosition={onClickMoveCurrentPosition}
                />
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default KakaoMap;
