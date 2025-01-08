"use client";

import type { Coordinates } from "@/app/map/_types/coordinates";
import React, { useEffect, useState } from "react";

const useCategoriesSearch = (
  currentPosition: Coordinates | null,
  setMapCenter: React.Dispatch<React.SetStateAction<Coordinates>>,
) => {
  const [category, setCategory] = useState<string>(""); // 카테고리 선택 상태 관리
  const [places, setPlaces] = useState<
    kakao.maps.services.PlacesSearchResultItem[]
  >([]); // 장소 검색 결과 리스트

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
      if (status === kakao.maps.services.Status.OK) {
        // 검색 결과를 저장
        setPlaces(result);
      }
    };
    // 내 위치 기준 카테고리 검색
    ps.keywordSearch(category, callback, {
      location: new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng),
      radius: 1000,
    });
  }, [category, currentPosition]);
  return { setCategory, places, onClickMoveCurrentPosition };
};
export default useCategoriesSearch;
