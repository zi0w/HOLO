import type {
  Coordinates,
  Place,
  PlacesSearchResultItem,
} from "@/app/map/_types/map";
import Cancel from "@/assets/images/map/cancel.svg";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

type MapContainerProps = {
  mapCenter: Coordinates;
  currentPosition: Coordinates | null;
  mapLevel: number;
  setMapCenter: Dispatch<SetStateAction<Coordinates>>;
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
};

const MapContainer = ({
  mapCenter,
  currentPosition,
  mapLevel,
  setMapCenter,
  places,
  setSelectedPlace,
  onClickMarker,
  selectedPlace,
  placeDetail,
  setPlaceDetail,
}: MapContainerProps) => {
  return (
    <Map
      center={mapCenter || currentPosition} // 지도를 내 위치 기준으로 표시
      className="z-0 h-[calc(100%-58px)] w-full"
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
          <div className="relative rounded bg-white p-4 pt-8 shadow">
            <div className="absolute right-2 top-2 text-right">
              <button
                onClick={() => {
                  setSelectedPlace(null); // 선택된 장소 초기화
                  setPlaceDetail(null); // 상세정보 초기화
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <Cancel />
              </button>
            </div>
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
  );
};

export default MapContainer;
