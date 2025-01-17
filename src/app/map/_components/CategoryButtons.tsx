import useScrollIntoViewCategoryBtn from "@/app/map/_hooks/useScrollIntoViewCategoryBtn";
import type { Place } from "@/app/map/_types/map";
import { MAP_CATEGORIES } from "@/app/map/constants/categories";
import clsx from "clsx";
import type { Dispatch, SetStateAction } from "react";

type CategoryButtonsProps = {
  setCategory: Dispatch<SetStateAction<string>>;
  setSelectedPlace: Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>
  >;
  setPlaceDetail: Dispatch<
    SetStateAction<Omit<
      Place,
      "place_id" | "x" | "y" | "road_address_name"
    > | null>
  >;
  category: string;
  isMain: boolean;
};

const CategoryButtons = ({
  setCategory, // 선택된 카테고리 상태 업데이트 함수
  setSelectedPlace, // 선택된 카테고리 장소 상태 업데이트 함수
  setPlaceDetail, // 특정 장소 선택 시 디테일 정보 상태 업데이트 함수
  category, // 선택된 카테고리 상태
  isMain, // 메인 화면일 때 지도 높이를 다르게 하기 위한 boolean
}: CategoryButtonsProps) => {
  const { buttonRef, onClickMoveCategoryBtn } = useScrollIntoViewCategoryBtn(
    setCategory,
    setSelectedPlace,
    setPlaceDetail,
  );

  return (
    <>
      {/* 페이지 제목 */}
      <div className="mx-5 my-4 font-gmarket-bold text-2xl">우리동네 핫플</div>

      {/* 버튼 카테고리 컨테이너 */}
      <div className="mx-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {MAP_CATEGORIES.map((cate, index) => (
          <button
            key={cate.id}
            // 버튼 엘리먼트를 참조 배열에 저장
            ref={(categoryBtn) => {
              buttonRef.current[index] = categoryBtn;
            }}
            className={clsx(
              "relative flex h-14 flex-shrink-0 items-center justify-center px-3.5 text-sm",
              category === cate.name // 선택한 카테고리 버튼에 적용할 style
                ? "text-primary-800 after:absolute after:bottom-0 after:h-[4px] after:w-full after:rounded-3xl after:bg-primary-500"
                : "",
            )}
            onClick={() => onClickMoveCategoryBtn(cate, index)} // scrollIntoView를 적용하기 위한 함수
          >
            {cate.img ? (
              <div className="mb-2 flex flex-col items-center">
                <cate.img />
                {cate.name}
              </div>
            ) : (
              cate.name
            )}
          </button>
        ))}
      </div>
      <div
        className={clsx("border-b-2 border-primary-100", isMain && "mb-5")}
      ></div>
    </>
  );
};

export default CategoryButtons;
