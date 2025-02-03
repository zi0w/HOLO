import useScrollIntoViewCategoryBtn from "@/app/map/_hooks/useScrollIntoViewCategoryBtn";
import type { Place } from "@/app/map/_types/map";
import { MAP_CATEGORIES } from "@/app/map/constants/categories";
import clsx from "clsx";
import { useState, type Dispatch, type SetStateAction } from "react";

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
  isMain: boolean;
};

const CategoryButtons = ({
  setCategory, // 선택된 카테고리 상태 업데이트 함수
  setSelectedPlace, // 선택된 카테고리 장소 상태 업데이트 함수
  setPlaceDetail, // 특정 장소 선택 시 디테일 정보 상태 업데이트 함수
  isMain, // 메인 화면일 때 지도 높이를 다르게 하기 위한 boolean
}: CategoryButtonsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("맛집"); // // 선택된 카테고리 상태 업데이트 함수
  const { buttonRef, onClickMoveCategoryBtn } = useScrollIntoViewCategoryBtn(
    setCategory,
    setSelectedPlace,
    setPlaceDetail,
    setSelectedCategory,
  );

  return (
    <>
      {/* 페이지 제목 */}
      <h1
        className={clsx(
          "common-title mx-5 my-4 lg:mx-0",
          isMain && "!text-[22px]",
        )}
      >
        우리동네 핫플
      </h1>

      {/* 버튼 카테고리 컨테이너 */}
      <div
        className={clsx(
          "mx-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden",
          isMain ? "lg:mx-0" : "lg:m-0 lg:mr-9 lg:gap-2",
        )}
      >
        {MAP_CATEGORIES.map((cate, index) => (
          <button
            key={cate.id}
            // 버튼 엘리먼트를 참조 배열에 저장
            ref={(categoryBtn) => {
              buttonRef.current[index] = categoryBtn;
            }}
            className={clsx(
              "relative flex items-center justify-between gap-2 text-sm text-base-700",
              isMain
                ? ""
                : "lg:mb-6 lg:flex lg:flex-none lg:items-center lg:justify-center lg:rounded-[4px] lg:border lg:px-4 lg:py-2 lg:after:hidden",
              selectedCategory === cate.name // 선택한 카테고리 버튼에 적용할 style
                ? `text-primary-800 after:absolute after:bottom-0 after:h-[4px] after:w-full after:rounded-3xl after:bg-primary-500 ${isMain ? "" : "lg:border-primary-800 lg:bg-primary-50 lg:text-primary-800"}`
                : `${isMain ? "" : "lg:border-base-500 lg:text-base-700"}`,
            )}
            onClick={() => onClickMoveCategoryBtn(cate, index)} // scrollIntoView를 적용하기 위한 함수
          >
            <div
              className={clsx(
                "mb-3 flex h-14 flex-col items-center justify-between whitespace-nowrap",
                isMain ? "" : "lg:mb-0 lg:flex lg:h-auto lg:flex-row lg:gap-2",
                cate.id === 7 ? "" : "px-4",
                isMain ? "" : "lg:px-0",
              )}
            >
              <div
                className={clsx(
                  "flex items-center p-2",
                  isMain ? "" : "lg:p-0",
                  selectedCategory === cate.name ? "rounded bg-primary-50" : "",
                )}
              >
                <cate.img />
              </div>
              {cate.name}
            </div>
          </button>
        ))}
      </div>
      <div
        className={clsx(
          "border-b-2 border-primary-100",
          isMain ? "mb-4 lg:mx-0" : "lg:border-none",
        )}
      ></div>
    </>
  );
};

export default CategoryButtons;
