import type { Place } from "@/app/map/_types/map";
import { useRef, type Dispatch, type SetStateAction } from "react";

const useScrollIntoViewCategoryBtn = (
  setCategory: Dispatch<SetStateAction<string>>, // 선택된 카테고리 버튼 상태 업데이트 함수
  setSelectedPlace: Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>
  >, // 선택된 카테고리 장소 상태 업데이트 함수
  setPlaceDetail: Dispatch<
    SetStateAction<Omit<
      Place,
      "place_id" | "x" | "y" | "road_address_name"
    > | null>
  >, // 특정 장소 선택 시 디테일 정보 상태 업데이트 함수
  setSelectedCategory: (category: string) => void, // 선택된 카테고리 버튼 상태 업데이트 함수,
) => {
  const buttonRef = useRef<(HTMLButtonElement | null)[]>([]); // 버튼 엘리먼트 참조를 위한 ref

  const onClickMoveCategoryBtn = (
    category: { id: number; name: string; img: string },
    index: number,
  ) => {
    setSelectedCategory(category.name);
    setCategory(category.name); // 선택한 카테고리 버튼 상태 업데이트
    setSelectedPlace(null);
    setPlaceDetail(null);

    buttonRef.current[index]?.scrollIntoView({
      behavior: "smooth", // 스크롤 애니메이션
      block: "nearest", // 스크롤 위치 설정
      inline: "center", // 버튼을 중앙에 배치
    });
  };
  return { buttonRef, onClickMoveCategoryBtn };
};

export default useScrollIntoViewCategoryBtn;
