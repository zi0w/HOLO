import type { Coordinates, PlacesSearchResultItem } from "@/app/map/_types/map";
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
        <div className="absolute bottom-0 flex max-h-[230px] w-full flex-col overflow-y-auto rounded-t-xl border border-primary-200 bg-white scrollbar-thin scrollbar-track-primary-50 scrollbar-thumb-primary-500 md:hidden">
          {(selectedPlace ? [] : places).map((place) => (
            <div
              key={place.id}
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
              <div className="rounded-xl p-2 hover:bg-primary-50">
                <p className="font-gmarket text-lg font-bold text-base-900">
                  {place.place_name}
                </p>
                <p className="text-base text-base-900">{place.address_name}</p>
              </div>
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
