import type { Coordinates } from "@/app/map/_types/coordinates";
import type { Place } from "@/app/map/_types/place";
import React, { useEffect, useState } from "react";

const useCategoriesSearch = (
  currentPosition: Coordinates | null,
  setMapCenter: React.Dispatch<React.SetStateAction<Coordinates>>,
) => {
  const [category, setCategory] = useState<string>(""); // 카테고리 선택 상태 관리
  const [places, setPlaces] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]); // 장소 검색 결과 리스트
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);

  const [placeDetail, setPlaceDetail] = useState<Place | null>(null);

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

  const onClickMarker = (place: kakao.maps.services.PlacesSearchResultItem) => {
    setSelectedPlace(place);
    getPlaceDetail(place.place_name);
  };

  const onClickMoveCurrentPosition = () => {
    if (!currentPosition) {
      alert("현재 위치를 가져올 수 없습니다. 위치 정보를 허용해주세요.");
      return;
    }
    setMapCenter(currentPosition);
  };

  useEffect(() => {
    if (!category || !currentPosition) return;

    const ps = new kakao.maps.services.Places();
    const callback = (
      result: kakao.maps.services.PlacesSearchResultItem[],
      status: kakao.maps.services.Status,
    ) => {
      if (result.length === 0) {
        setPlaces([]);
        alert("근처에 해당 시설이 없습니다.");
      }
      if (status === kakao.maps.services.Status.OK) {
        // 검색 결과를 저장
        setPlaces(result);
      }
    };
    // 내 위치 기준 카테고리 검색
    ps.keywordSearch(category, callback, {
      location: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
      radius: 1500,
    });
  }, [category, currentPosition]);
  return {
    setCategory,
    places,
    onClickMoveCurrentPosition,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
  };
};
export default useCategoriesSearch;
