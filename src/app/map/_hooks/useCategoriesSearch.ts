"use client";

import type {
  Coordinates,
  Place,
  PlacesSearchResultItem,
} from "@/app/map/_types/map";
import useLocationStore from "@/store/useLocationStore";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

const useCategoriesSearch = (mapCenter: Coordinates | null) => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("맛집"); // 카테고리 선택 상태 관리
  const [places, setPlaces] = useState<PlacesSearchResultItem[]>([]); // 장소 검색 결과 리스트
  const [reSearch, setReSearch] = useState<boolean>(true);
  const { selectedPlace, setSelectedPlace, kakaoLoading, setMapLevel } =
    useLocationStore();

  const [placeDetail, setPlaceDetail] = useState<Omit<
    Place,
    "place_id" | "x" | "y" | "road_address_name"
  > | null>(null);

  // 선택한 마커 장소 상세정보 가져오기
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
        throw new Error("장소 정보를 가져오는데 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("장소 정보를 가져오는데 실패했습니다.");
    }
  };

  // 마커를 클릭했을 때, 장소 정보를 가지고 옴
  const onClickMarker = (place: PlacesSearchResultItem) => {
    setSelectedPlace(place);
    getPlaceDetail(place.place_name);
  };

  // 맵 센터를 기준으로 카테고리 장소를 검색하는 함수
  const searchPlaces = () => {
    if (!window.kakao || !window.kakao.maps) return;

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(
      category,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(result);
        } else {
          setPlaces([]);
        }
        setReSearch(false);
        setMapLevel(5);
      },
      {
        location: new kakao.maps.LatLng(mapCenter!.lat, mapCenter!.lng),
        radius: 1500,
      },
    );
  };

  // 카테고리나 맵 센터가 변경될 때 검색 실행
  useEffect(() => {
    if (reSearch) {
      searchPlaces();
    }
  }, [kakaoLoading, reSearch, category]);

  // 카테고리 변경 시 검색 트리거
  const handleCategoryChange: Dispatch<SetStateAction<string>> = useCallback(
    (newValue) => {
      const newCategory =
        typeof newValue === "function" ? newValue(category) : newValue;
      setCategory(newCategory);
      setReSearch(true);
    },
    [category],
  );

  // 검색 버튼 클릭 핸들러
  const onClickReSearch = () => {
    setReSearch(true);
  };

  return {
    setCategory: handleCategoryChange,
    searchPlaces,
    places,
    onClickMarker,
    selectedPlace,
    placeDetail,
    setSelectedPlace,
    setPlaceDetail,
    category,
    onClickReSearch,
    setSelectedMarkerId,
    selectedMarkerId,
  };
};
export default useCategoriesSearch;
