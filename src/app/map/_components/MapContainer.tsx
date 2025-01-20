import type {
  Coordinates,
  Place,
  PlacesSearchResultItem,
} from "@/app/map/_types/map";
import { clsx } from "clsx";
import { type Dispatch, type SetStateAction } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

type MapContainerProps = {
  mapCenter: Coordinates | null;
  currentPosition: Coordinates | null;
  mapLevel: number;
  setMapCenter: (center: Coordinates) => void;
  places: PlacesSearchResultItem[];
  setSelectedPlace: Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>
  >;
  onClickMarker: (place: PlacesSearchResultItem) => void;
  selectedPlace: PlacesSearchResultItem | null;
  placeDetail: Omit<Place, "place_id" | "x" | "y" | "road_address_name"> | null;
  setPlaceDetail: Dispatch<
    SetStateAction<Omit<
      Place,
      "place_id" | "x" | "y" | "road_address_name"
    > | null>
  >;
  isMain: boolean;
  setSelectedMarkerId: Dispatch<SetStateAction<string | null>>;
  selectedMarkerId: string | null;
};

const MapContainer = ({
  mapCenter,
  currentPosition,
  mapLevel,
  setMapCenter,
  places,
  setSelectedPlace,
  onClickMarker,
  isMain,
  setSelectedMarkerId,
  selectedMarkerId,
}: MapContainerProps) => {
  const onClickChangeLocation = (
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
  return (
    <Map
      center={mapCenter! || currentPosition} // 지도를 내 위치 기준으로 표시
      className={clsx("h-[calc(100%-275px)] w-full", isMain && "!h-full")}
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
            image={{
              src:
                selectedMarkerId === place.id
                  ? "/images/marker.svg"
                  : "/images/selected-marker.svg",
              size: {
                width: 24,
                height: 24,
              },
            }}
            onClick={() => onClickChangeLocation(place)}
          />
          <CustomOverlayMap
            position={{
              lat: parseFloat(place.y),
              lng: parseFloat(place.x),
            }}
            xAnchor={0.5} // x축 기준 중앙
            yAnchor={0} // y축 기준 아래쪽 (조정 필요)
          >
            <div
              className="text-center text-xs font-bold text-base-900"
              style={{
                color: "#000000", // 텍스트 색상 (검정색)
                textShadow: `
                  -1px -1px 0 #FFFFFF, 
                   1px -1px 0 #FFFFFF, 
                  -1px 1px 0 #FFFFFF, 
                   1px 1px 0 #FFFFFF
                  `,
              }}
            >
              <p>{place.place_name}</p>
            </div>
          </CustomOverlayMap>
        </>
      ))}

      {/* 내 위치 마커 */}
      {currentPosition && (
        <>
          <MapMarker
            position={currentPosition}
            image={{
              src: "/images/ping.svg",
              size: {
                width: 32,
                height: 32,
              },
            }}
          />
          <CustomOverlayMap
            position={currentPosition}
            xAnchor={0.5} // x축 기준 중앙
            yAnchor={0} // y축 기준 아래쪽 (조정 필요)
          ></CustomOverlayMap>
        </>
      )}
    </Map>
  );
};

export default MapContainer;
