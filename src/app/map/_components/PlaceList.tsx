"use client";

import type { Coordinates, PlacesSearchResultItem } from "@/app/map/_types/map";
import scrollIntoViewPlaceList from "@/app/map/_utils/scrollIntoViewPlaceList";
import scrollToPlaceList from "@/app/map/_utils/scrollToPlaceList";
import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";

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
};

const PlaceList = ({
  places,
  setMapCenter,
  setSelectedPlace,
  onClickMarker,
  selectedPlace,
  category,
  setSelectedMarkerId,
}: PlaceListProps) => {
  const placeRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopListRef = useRef<HTMLDivElement | null>(null);
  const mobileListRef = useRef<HTMLDivElement | null>(null);

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
      {category ? (
        <div
          ref={desktopListRef}
          className={clsx(
            "absolute left-0 top-[110px] z-20 hidden max-h-[80%] w-[260px] overflow-y-auto rounded-t border bg-white md:hidden lg:block",
            places.length === 0 ? "min-h-[80%]" : "min-h-[80%]",
          )}
        >
          {places.length !== 0 ? (
            places.map((place, index) => (
              <div
                key={place.id}
                ref={(place) => {
                  placeRef.current[index] = place;
                }}
                className="w-full cursor-pointer rounded p-4 text-left hover:bg-primary-50"
                onClick={() => {
                  onClickSelectedPlace(place);
                }}
              >
                <p className="font-gmarket-bold text-lg text-base-900">
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
                {place.place_url ? (
                  <Link
                    href={place.place_url}
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
            ))
          ) : (
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
              조건에 맞는 업체가 없습니다.
            </div>
          )}
        </div>
      ) : (
        <div className="hidden"></div>
      )}
      {/* 모바일용 리스트 */}

      <div
        ref={mobileListRef}
        className="absolute bottom-[-52px] z-10 flex max-h-[230px] w-full flex-col overflow-y-auto rounded-t-xl border border-primary-200 bg-white lg:hidden"
      >
        {places.map((place, index) => (
          <div
            key={place.id}
            ref={(el) => {
              placeRef.current[index] = el;
            }}
            className="w-full cursor-pointer border-b border-base-200 p-2 text-left"
            onClick={() => {
              onClickSelectedPlace(place);
            }}
          >
            <div
              className={clsx(
                "rounded-xl p-2 hover:bg-primary-50",
                selectedPlace?.id === place.id && "bg-primary-50",
              )}
            >
              <p className="font-gmarket-bold text-lg font-bold text-base-900">
                {place.place_name}
              </p>
              <p className="text-base text-base-900">{place.address_name}</p>
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
              {place.place_url ? (
                <Link
                  href={place.place_url}
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
          </div>
        ))}
      </div>
    </>
  );
};

export default PlaceList;
