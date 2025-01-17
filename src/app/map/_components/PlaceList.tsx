import usePlaceListScrollInView from "@/app/map/_hooks/usePlaceListScrollInView";
import usePlaceListScrollTo from "@/app/map/_hooks/usePlaceListScrollTo";
import type { Coordinates, PlacesSearchResultItem } from "@/app/map/_types/map";
import { clsx } from "clsx";
import Link from "next/link";
import { useRef, type Dispatch, type SetStateAction } from "react";

type PlaceListProps = {
  places: PlacesSearchResultItem[];
  setMapCenter: Dispatch<SetStateAction<Coordinates>>;
  setSelectedPlace: Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>
  >;
  onClickMarker: (place: PlacesSearchResultItem) => void;
  selectedPlace: PlacesSearchResultItem | null;
  category: string;
};

const PlaceList = ({
  places,
  setMapCenter,
  setSelectedPlace,
  onClickMarker,
  selectedPlace,
  category,
}: PlaceListProps) => {
  const placeRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopListRef = useRef<HTMLDivElement | null>(null);
  const mobileListRef = useRef<HTMLDivElement | null>(null);

  usePlaceListScrollInView(selectedPlace, places, placeRef);

  usePlaceListScrollTo(category, desktopListRef);
  usePlaceListScrollTo(category, mobileListRef);

  return (
    <>
      {/* 데스크탑 테블릿 리스트 */}
      {category ? (
        <div
          ref={desktopListRef}
          className="absolute left-4 top-4 hidden max-h-80 overflow-y-auto rounded bg-white shadow-md md:left-0 md:top-0 md:block md:h-full md:max-h-full md:w-[300px] md:overflow-y-auto lg:left-0 lg:top-0 lg:h-full lg:max-h-full lg:w-[300px]"
        >
          {places.map((place, index) => (
            <div
              key={place.id}
              ref={(place) => {
                placeRef.current[index] = place;
              }}
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
      ) : (
        <div className="hidden"></div>
      )}
      {/* 모바일용 리스트 */}

      <div
        ref={mobileListRef}
        className="absolute bottom-[51px] z-10 flex max-h-[230px] w-full flex-col overflow-y-auto rounded-t-xl border border-primary-200 bg-white md:hidden"
      >
        {places.map((place, index) => (
          <div
            key={place.id}
            ref={(el) => {
              placeRef.current[index] = el;
            }}
            className="w-full cursor-pointer border-b border-base-200 p-2 text-left"
            onClick={() => {
              setMapCenter({
                lat: parseFloat(place.y),
                lng: parseFloat(place.x),
              });
              setSelectedPlace(place);
              onClickMarker(place);
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
                  <a href={`tel: ${place.phone}`} className="text-blue-500">
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
