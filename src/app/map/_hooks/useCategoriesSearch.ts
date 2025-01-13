import type { Coordinates } from "@/app/map/_types/coordinates";
import type { Place } from "@/app/map/_types/place";
import React, { useEffect, useState } from "react";

type PlacesSearchResultItem = kakao.maps.services.PlacesSearchResultItem;

const useCategoriesSearch = (
  currentPosition: Coordinates | null,
  setMapCenter: React.Dispatch<React.SetStateAction<Coordinates>>,
) => {
  const [category, setCategory] = useState<string>(""); // 카테고리 선택 상태 관리
  const [places, setPlaces] = useState<PlacesSearchResultItem[]>([]); // 장소 검색 결과 리스트
  const [selectedPlace, setSelectedPlace] =
    useState<PlacesSearchResultItem | null>(null);

  const [placeDetail, setPlaceDetail] = useState<Place | null>(null);

  // 현재 위치 기준 재검색
  const onClickResearch = async (center: Coordinates) => {
    if (!center || !category) {
      alert("위치를 확인하고 카테고리를 선택해주세요");
      return;
    }

    try {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(
        category,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setPlaces(result);
          } else {
            alert("검색 결과가 없습니다.");
            setPlaces([]);
          }
        },
        {
          location: new kakao.maps.LatLng(center.lat, center.lng),
          radius: 1500,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

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
        location: new kakao.maps.LatLng(
          currentPosition.lat,
          currentPosition.lng,
        ),
        radius: 1500,
      },
    );
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
    onClickResearch,
  };
};
export default useCategoriesSearch;
