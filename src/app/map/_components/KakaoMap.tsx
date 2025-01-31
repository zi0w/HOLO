"use client";

import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";

import CategoryButtons from "@/app/map/_components/CategoryButtons";
import MapContainer from "@/app/map/_components/MapContainer";
import MapControls from "@/app/map/_components/MapControls";
import PlaceList from "@/app/map/_components/PlaceList";
import useCategoriesSearch from "@/app/map/_hooks/useCategoriesSearch";
import locationStore from "@/store/useLocationStore";

const KakaoMap = () => {
  useKakaoLoader();

  const {
    mapCenter, // 현재 지도 중심 좌표
    setMapCenter, // 중심 좌표 업데이트 함수
    currentPosition, // 현재 위치
    geolocationError, // 사용자 위치를 불러오지 못할 때 에러
    mapLevel, // 지도 확대, 축소 크기 단계 상태
    onClickPlusMapLevel, // 지도 확대 함수
    onClickMinusMapLevel, // 지도 축소 함수
    onClickMoveCurrentPosition, // 지도의 위치를 옮겼을 때, 다시 내 위치로 이동 함수
  } = locationStore();

  const {
    setCategory,
    places,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
    category,
    onClickReSearch,
    setSelectedMarkerId,
    selectedMarkerId,
  } = useCategoriesSearch(mapCenter);

  return (
    <div className="relative h-[calc(100vh-124px)]">
      {geolocationError && <div>{geolocationError}</div>}

      {/* 카테고리 검색 버튼 */}
      <CategoryButtons
        isMain={false}
        setCategory={setCategory}
        setSelectedPlace={setSelectedPlace}
        setPlaceDetail={setPlaceDetail}
      />

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
        isMain={false}
        setSelectedMarkerId={setSelectedMarkerId}
        selectedMarkerId={selectedMarkerId}
      />

      {/* 데스크톱과 태블릿용 리스트 */}
      <PlaceList
        places={places}
        setMapCenter={setMapCenter}
        setSelectedPlace={setSelectedPlace}
        onClickMarker={onClickMarker}
        selectedPlace={selectedPlace}
        category={category}
        setSelectedMarkerId={setSelectedMarkerId}
      />
      {/* 줌 컨트롤 버튼 */}
      <MapControls
        onClickPlusMapLevel={onClickPlusMapLevel}
        onClickMinusMapLevel={onClickMinusMapLevel}
        onClickMoveCurrentPosition={onClickMoveCurrentPosition}
        onClickReSearch={onClickReSearch}
      />
    </div>
  );
};
export default KakaoMap;
