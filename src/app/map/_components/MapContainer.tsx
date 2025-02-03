import MapControls from "@/app/map/_components/MapControls";
import type {
  Coordinates,
  Place,
  PlacesSearchResultItem,
} from "@/app/map/_types/map";
import useLocationStore from "@/store/useLocationStore";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, type Dispatch, type SetStateAction } from "react";
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
  onClickPlusMapLevel: () => void;
  onClickMinusMapLevel: () => void;
  onClickMoveCurrentPosition: () => void;
};

const MapContainer = ({
  mapCenter,
  currentPosition,
  mapLevel,
  setMapCenter,
  places,
  setSelectedPlace,
  isMain,
  selectedPlace,
  setSelectedMarkerId,
  selectedMarkerId,
  onClickPlusMapLevel,
  onClickMinusMapLevel,
  onClickMoveCurrentPosition,
}: MapContainerProps) => {
  const router = useRouter();
  const { setMapLevel } = useLocationStore();
  const onClickCurrentMarker = (
    place: kakao.maps.services.PlacesSearchResultItem,
  ) => {
    if (isMain) {
      router.push("/map");
    } else {
      setMapCenter({
        lat: parseFloat(place.y),
        lng: parseFloat(place.x),
      });
      setSelectedPlace(place);
      setMapLevel(3);

      setSelectedMarkerId(place.id);
    }
  };
  useEffect(() => {
    if (selectedPlace && !isMain) onClickCurrentMarker(selectedPlace);
  }, []);
  return (
    <div className="relative h-full w-full lg:w-[1048px]">
      <Map
        center={mapCenter! || currentPosition} // 지도를 내 위치 기준으로 표시
        className={clsx("h-full w-full rounded", isMain && "lg:w-[57%]")}
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
          <React.Fragment key={place.id}>
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
              onClick={() => {
                onClickCurrentMarker(place);
                setSelectedPlace(place);
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
          </React.Fragment>
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

        {/*데스크 탑 맵 컨트롤 버튼 */}
        {!isMain && (
          <div className="hidden lg:absolute lg:bottom-10 lg:right-4 lg:z-10 lg:block">
            <MapControls
              onClickPlusMapLevel={onClickPlusMapLevel}
              onClickMinusMapLevel={onClickMinusMapLevel}
              onClickMoveCurrentPosition={onClickMoveCurrentPosition}
            />
          </div>
        )}
      </Map>
    </div>
  );
};

export default MapContainer;
