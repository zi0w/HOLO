"use client";

import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import useKakaoMap from "@/app/map/_hooks/useKakaoMap";

import useCategoriesSearch from "@/app/map/_hooks/useCategoriesSearch";
import Link from "next/link";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  useKakaoLoader();

  const {
    mapCenter, // 현재 지도 중심 좌표
    setMapCenter, // 중심 좌표 업데이트 함수
    currentPosition, // 현재 위치
    geolocationError,
    mapLevel,
    onClickPlusMapLevel,
    onClickMinusMapLevel,
  } = useKakaoMap();

  const {
    setCategory,
    places,
    onClickMoveCurrentPosition,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
  } = useCategoriesSearch(currentPosition, setMapCenter);

  return (
    <div className="relative h-screen">
      {geolocationError && <div>{geolocationError}</div>}

      <Map
        center={mapCenter || currentPosition} // 지도를 내 위치 기준으로 표시
        className="z-0 h-full w-full"
        level={mapLevel} // 지도의 확대 레벨
        onCenterChanged={(map) => {
          // 사용자가 지도를 드래그로 이동하면 현재 지도 중심 업데이트
          const center = map.getCenter();
          setMapCenter({
            lat: center.getLat(),
            lng: center.getLng(),
          });
        }}
      >
        {/* 검색된 장소 마커 표시 */}
        {places.map((place) => (
          <>
            <MapMarker
              key={place.id}
              position={{
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              }}
              onClick={() => onClickMarker(place)}
            />
            <CustomOverlayMap
              position={{
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              }}
              xAnchor={0.5} // x축 기준 중앙
              yAnchor={0} // y축 기준 아래쪽 (조정 필요)
            >
              <div className="text-center text-sm font-semibold">
                <p>{place.place_name}</p>
              </div>
            </CustomOverlayMap>
          </>
        ))}
        {selectedPlace && placeDetail && (
          <CustomOverlayMap
            position={{
              lat: parseFloat(selectedPlace.y),
              lng: parseFloat(selectedPlace.x),
            }}
          >
            <div className="rounded bg-white p-4 shadow">
              <button
                onClick={() => {
                  setSelectedPlace(null); // 선택된 장소 초기화
                  setPlaceDetail(null); // 상세정보 초기화
                }}
                className="text-right text-gray-500 hover:text-gray-800"
              >
                X
              </button>
              <h3 className="text-lg font-bold">{placeDetail.place_name}</h3>

              <p>{placeDetail.address_name}</p>
              <p>{placeDetail.phone || "전화번호 없음"}</p>
              <Link
                href={placeDetail.place_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                상세 정보 보기
              </Link>
            </div>
          </CustomOverlayMap>
        )}
        {currentPosition && (
          <>
            <MapMarker position={currentPosition} />
            <CustomOverlayMap
              position={currentPosition}
              xAnchor={0.5} // x축 기준 중앙
              yAnchor={0} // y축 기준 아래쪽 (조정 필요)
            >
              <div className="text-sm font-semibold">
                <p>내 위치</p>
              </div>
            </CustomOverlayMap>
          </>
        )}
      </Map>
      <div className="absolute left-4 top-4 z-10">
        {[
          "다이소",
          "병원",
          "약국",
          "세탁소",
          "미용실",
          "편의점",
          "은행",
          "행정복지센터",
          "카페",
          "헬스장",
        ].map((item) => (
          <button
            key={item}
            className="mx-2 rounded bg-white p-2 shadow-md hover:bg-gray-200"
            onClick={() => {
              setCategory(item);
              setSelectedPlace(null);
              setPlaceDetail(null);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {/* 리스트 출력 */}
      <div className="absolute bottom-80 left-4 max-h-80 space-y-2 overflow-y-auto rounded bg-white shadow-md">
        {places.map((place) => (
          <div
            key={place.id}
            className="cursor-pointer rounded py-2 hover:bg-gray-200"
            onClick={() => {
              setMapCenter({
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              });
              setSelectedPlace(place);
              onClickMarker(place);
            }}
          >
            <p className="font-bold">{place.place_name}</p>
            <p className="text-sm">{place.address_name}</p>
          </div>
        ))}
      </div>
      {/* 줌 컨트롤 버튼 */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          className="rounded bg-white p-2 shadow hover:bg-gray-300"
          onClick={onClickPlusMapLevel} // 확대
        >
          +
        </button>
        <button
          className="rounded bg-white p-2 shadow hover:bg-gray-300"
          onClick={onClickMinusMapLevel} // 축소
        >
          −
        </button>
      </div>
      <button
        className="absolute bottom-16 left-10 z-10 rounded bg-white p-2 shadow hover:bg-blue-400"
        onClick={onClickMoveCurrentPosition}
      >
        내 위치
      </button>
    </div>
  );
};
export default KakaoMap;
