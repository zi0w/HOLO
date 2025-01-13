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
    onClickMoveCurrentPosition,
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
              onClick={() => {
                setMapCenter({
                  lat: parseFloat(place.y),
                  lng: parseFloat(place.x),
                });
                setSelectedPlace(place);
                onClickMarker(place);
              }}
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

        {/* 오버레이 */}
        {selectedPlace && placeDetail && (
          <CustomOverlayMap
            position={{
              lat: parseFloat(selectedPlace.y),
              lng: parseFloat(selectedPlace.x),
            }}
            xAnchor={0.5} // x축 기준 중앙
            yAnchor={1.4}
          >
            <div className="rounded bg-white p-4 shadow">
              <button
                onClick={() => {
                  setSelectedPlace(null); // 선택된 장소 초기화
                  setPlaceDetail(null); // 상세정보 초기화
                }}
                className="absolute right-2 top-2 text-right text-gray-500 hover:text-gray-800"
              >
                X
              </button>
              <h3 className="text-lg font-bold">{placeDetail.place_name}</h3>

              <p>{placeDetail.address_name}</p>
              <p>{placeDetail.phone || "전화번호 없음"}</p>
              {placeDetail.place_url ? (
                <Link
                  href={placeDetail.place_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  상세 정보 보기
                </Link>
              ) : (
                ""
              )}
            </div>
          </CustomOverlayMap>
        )}

        {/* 내 위치 마커 */}
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

      {/* 카테고리 검색 버튼 */}
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

      {/* 데스크톱과 태블릿용 리스트 */}
      <div className="absolute left-4 top-4 hidden max-h-80 overflow-y-auto rounded bg-white shadow-md md:left-0 md:top-0 md:block md:h-full md:max-h-full md:w-[300px] md:overflow-y-auto lg:left-0 lg:top-0 lg:h-full lg:max-h-full lg:w-[300px]">
        {places.map((place) => (
          <div
            key={place.id}
            className="w-full cursor-pointer rounded bg-gray-50 p-4 text-left hover:bg-gray-200"
            onClick={() => {
              setMapCenter({
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              });
              setSelectedPlace(place);
              onClickMarker(place);
            }}
          >
            <p className="text-sm font-bold">{place.place_name}</p>
            <p className="text-xs text-gray-600">{place.address_name}</p>
          </div>
        ))}
      </div>

      {/* 모바일용 리스트 */}
      <div className="absolute bottom-28 flex max-h-[200px] w-full flex-col space-y-2 overflow-y-auto bg-white px-4 py-2 shadow-md md:hidden">
        {places.map((place) => (
          <div
            key={place.id}
            className="w-full cursor-pointer rounded bg-gray-50 p-2 text-left hover:bg-gray-200"
            onClick={() => {
              setMapCenter({
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              });
              setSelectedPlace(place);
              onClickMarker(place);
            }}
          >
            <p className="text-sm font-bold">{place.place_name}</p>
            <p className="text-xs text-gray-600">{place.address_name}</p>
          </div>
        ))}
      </div>

      {/* 줌 컨트롤 버튼 */}
      <div className="absolute bottom-52 right-4 flex flex-col space-y-2">
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

      {/* 내 위치 버튼*/}
      <button
        className="absolute bottom-60 left-10 z-10 rounded bg-white p-2 shadow hover:bg-blue-400"
        onClick={onClickMoveCurrentPosition}
      >
        내 위치
      </button>
    </div>
  );
};
export default KakaoMap;
