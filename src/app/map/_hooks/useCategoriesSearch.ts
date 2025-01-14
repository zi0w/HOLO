import type { Coordinates, Place } from "@/app/map/_types/map";
import { useEffect, useState } from "react";

type PlacesSearchResultItem = kakao.maps.services.PlacesSearchResultItem;

const useCategoriesSearch = (mapCenter: Coordinates) => {
  const [category, setCategory] = useState<string>(""); // 카테고리 선택 상태 관리
  const [places, setPlaces] = useState<PlacesSearchResultItem[]>([]); // 장소 검색 결과 리스트
  const [selectedPlace, setSelectedPlace] =
    useState<PlacesSearchResultItem | null>(null);

  const [placeDetail, setPlaceDetail] = useState<Omit<
    Place,
    "place_id" | "x" | "y" | "road_address_name"
  > | null>(null);

  const getPlaceDetail = async (placeName: string) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(placeName)}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("장소 정보를 가져오는데 실패했습니다.");
      }
      const data = await response.json();
      const result = data.documents[0];
      if (result) {
        setPlaceDetail(result);
      } else {
        alert("장소 정보를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("장소 정보 요청에 실패하였습니다.", error);
      alert("장소 정보 요청에 실패하였습니다.");
    }
  };

  const onClickMarker = (place: PlacesSearchResultItem) => {
    setSelectedPlace(place);
    getPlaceDetail(place.place_name);
  };

  useEffect(() => {
    if (!category) return;

    const ps = new kakao.maps.services.Places();

    // 내 위치 기준 카테고리 검색
    ps.keywordSearch(
      category,
      (result, status) => {
        if (result.length === 0) {
          setPlaces([]);
          alert("근처에 해당 시설이 없습니다.");
        }
        if (status === kakao.maps.services.Status.OK) {
          // 검색 결과를 저장
          setPlaces(result);
        }
      },
      {
        location: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
        radius: 1500,
      },
    );
  }, [category]);
  return {
    setCategory,
    places,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
  };
};
export default useCategoriesSearch;
