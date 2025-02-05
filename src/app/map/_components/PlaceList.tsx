"use client";

import MapControls from "@/app/map/_components/MapControls";
import type { Coordinates, PlacesSearchResultItem } from "@/app/map/_types/map";
import scrollIntoViewPlaceList from "@/app/map/_utils/scrollIntoViewPlaceList";
import scrollToPlaceList from "@/app/map/_utils/scrollToPlaceList";
import None from "@/assets/images/map/none.svg";
import useLocationStore from "@/store/useLocationStore";
import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

type PlaceListProps = {
  places: PlacesSearchResultItem[];
  setMapCenter: (center: Coordinates) => void;
  setSelectedPlace: Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>
  >;
  onClickMarker: (place: PlacesSearchResultItem) => void;
  selectedPlace: PlacesSearchResultItem | null;
  category: string;
  setSelectedMarkerId: Dispatch<SetStateAction<string | null>>;
  onClickPlusMapLevel: () => void;
  onClickMinusMapLevel: () => void;
  onClickMoveCurrentPosition: () => void;
};

const PlaceList = ({
  places,
  setMapCenter,
  setSelectedPlace,
  onClickMarker,
  selectedPlace,
  category,
  setSelectedMarkerId,
  onClickPlusMapLevel,
  onClickMinusMapLevel,
  onClickMoveCurrentPosition,
}: PlaceListProps) => {
  const placeRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopListRef = useRef<HTMLDivElement | null>(null);
  const mobileListRef = useRef<HTMLDivElement | null>(null);
  const { setMapLevel } = useLocationStore();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  // 리스트에서 특정 장소를 클릭하면 맵에 해당 장소 마커 표시
  const onClickSelectedPlace = (
    place: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    setMapCenter({
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
    });
    setSelectedPlace(place);
    onClickMarker(place);
    setSelectedMarkerId(place.id);
  };

  // 마커를 클릭하면 해당 시설 정보로 리스트 스크롤 이동
  useEffect(() => {
    scrollIntoViewPlaceList(
      selectedPlace?.id || null,
      places,
      placeRef.current,
    );
  }, [selectedPlace, places]);

  // 카테고리가 변경되었을 때, 스크롤을 최상단으로 초기화
  useEffect(() => {
    scrollToPlaceList([desktopListRef.current, mobileListRef.current]);
  }, [category]);

  return (
    <>
      {/* 데스크탑 테블릿 리스트 */}
      {!isMobile && (
        <>
          <div
            ref={desktopListRef}
            className="hidden lg:block lg:w-[260px] lg:overflow-y-auto lg:rounded-t lg:border lg:bg-white"
            role="region"
            aria-label="검색된 장소 목록"
          >
            {places.length !== 0 ? (
              places.map((place, index) => (
                <div
                  key={place.id}
                  ref={(el) => {
                    placeRef.current[index] = el;
                  }}
                  className={clsx(
                    "w-full cursor-pointer border-b border-base-200 p-5 text-left hover:bg-primary-50",
                    selectedPlace?.id === place.id && "bg-primary-50",
                  )}
                  onClick={() => {
                    onClickSelectedPlace(place);
                    setMapLevel(3);
                  }}
                >
                  <p className="mb-1 font-gmarket-bold text-lg text-base-900">
                    {place.place_name}
                  </p>
                  <p className="text-base-900">{place.address_name}</p>
                  {place.phone ? (
                    <div>
                      <a href={`tel: ${place.phone}`} className="text-base-900">
                        {place.phone}
                      </a>
                    </div>
                  ) : (
                    <p className="text-base-900">전화번호 없음</p>
                  )}
                  {place.place_url && (
                    <Link
                      href={place.place_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      상세 정보 보기
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center space-y-3"
                role="alert"
                aria-label="검색 결과 없음"
              >
                <None />
                <p>조건에 맞는 업체가 없습니다.</p>
              </div>
            )}
          </div>
        </>
      )}
      {/* 모바일용 리스트 */}
      {isMobile && (
        <>
          <BottomSheet
            open={true}
            aria-labelledby="place-list-title"
            snapPoints={({ maxHeight }) => {
              if (places.length === 0) {
                return [180, 80]; // 픽셀 단위로 최소 높이 지정
              } else if (places.length === 1) {
                return [220, 80]; // 한 개 항목일 때의 높이
              } else {
                return [maxHeight * 0.3, 80, maxHeight * 0.86];
              }
            }}
            defaultSnap={({ lastSnap, snapPoints }) =>
              lastSnap ?? snapPoints[0]
            }
            expandOnContentDrag
            blocking={false} // 배경 클릭 방지 비활성화
            className="absolute z-10 h-auto bg-transparent"
            footer={
              <div className="h-6 bg-transparent" /> // 푸터에 여백 추가
            }
            aria-label="장소 목록 패널"
            role="dialog"
            aria-modal="true"
            aria-describedby="place-list-description"
          >
            <div
              ref={mobileListRef}
              role="region"
              aria-label="검색된 장소 목록"
              id="place-list-description"
              className="min-h-[100px]"
            >
              <h2 id="place-list-title" className="sr-only">
                검색된 장소 목록
              </h2>
              {places.length !== 0 ? (
                places.map((place, index) => (
                  <div
                    aria-label="장소 정보"
                    key={place.id}
                    ref={(el) => {
                      placeRef.current[index] = el;
                    }}
                    className={clsx(
                      "w-full cursor-pointer border-b border-base-200 p-5 text-left hover:bg-primary-50",

                      selectedPlace?.id === place.id && "bg-primary-50",
                    )}
                    onClick={() => {
                      onClickSelectedPlace(place);
                      setMapLevel(3);
                    }}
                  >
                    <p className="mb-1 font-gmarket-bold text-lg text-base-900">
                      {place.place_name}
                    </p>
                    <p className="text-base text-base-900">
                      {place.address_name}
                    </p>
                    {place.phone ? (
                      <div>
                        <a
                          href={`tel: ${place.phone}`}
                          className="text-base text-base-900"
                        >
                          {place.phone}
                        </a>
                      </div>
                    ) : (
                      <p className="text-base-900">전화번호 없음</p>
                    )}
                    {place.place_url && (
                      <Link
                        href={place.place_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        상세 정보 보기
                      </Link>
                    )}
                  </div>
                ))
              ) : (
                <div
                  className="mt-4 flex flex-col items-center justify-center space-y-3"
                  role="alert"
                  aria-label="검색 결과 없음"
                >
                  <None />
                  <p>조건에 맞는 업체가 없습니다.</p>
                </div>
              )}
            </div>
          </BottomSheet>

          <div
            className="absolute bottom-72 right-4 z-10"
            role="group"
            aria-label="지도 컨트롤"
          >
            <MapControls
              onClickPlusMapLevel={onClickPlusMapLevel}
              onClickMinusMapLevel={onClickMinusMapLevel}
              onClickMoveCurrentPosition={onClickMoveCurrentPosition}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PlaceList;
