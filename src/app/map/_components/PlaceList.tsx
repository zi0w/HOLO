import type { Coordinates, PlacesSearchResultItem } from "@/app/map/_types/map";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

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
  return (
    <>
      {/* 데스크탑 테블릿 리스트 */}
      {category ? (
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
      ) : (
        <div className="hidden"></div>
      )}
      {/* 모바일용 리스트 */}
      {category ? (
        <div className="absolute bottom-28 flex max-h-[200px] w-full flex-col space-y-2 overflow-y-auto bg-white px-4 py-2 shadow-md md:hidden">
          {(selectedPlace ? [selectedPlace] : places).map((place) => (
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
              <p>{place.phone || "전화번호 없음"}</p>
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
          ))}
        </div>
      ) : (
        <div className="hidden"></div>
      )}
    </>
  );
};

export default PlaceList;
