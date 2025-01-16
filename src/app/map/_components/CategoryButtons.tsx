"use client";

import type { Place } from "@/app/map/_types/map";
import { MAP_CATEGORIES } from "@/app/map/constants/categories";
import clsx from "clsx";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";

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
  setCategory,
  setSelectedPlace,
  setPlaceDetail,
  isMain,
}: CategoryButtonsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const buttonRef = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <>
      <div className="mx-5 my-4 font-gmarket text-2xl font-bold">
        우리동네 핫플
      </div>
      <div className="mx-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {MAP_CATEGORIES.map((category, index) => (
          <button
            key={category.id}
            ref={(el) => {
              buttonRef.current[index] = el;
            }}
            className={clsx(
              "relative flex h-14 flex-shrink-0 items-center justify-center px-3.5 text-sm",
              selectedCategory === category.name
                ? "text-primary-800 after:absolute after:bottom-0 after:h-[4px] after:w-full after:rounded-3xl after:bg-primary-500"
                : "",
            )}
            onClick={() => {
              setCategory(category.name);
              setSelectedCategory(category.name);
              setSelectedPlace(null);
              setPlaceDetail(null);

              buttonRef.current[index]?.scrollIntoView({
                behavior: "smooth", // 스크롤 애니메이션
                block: "nearest", // 스크롤 위치 설정
                inline: "center", // 버튼을 중앙에 배치
              });
            }}
          >
            {category.img ? (
              <div className="mb-2 flex flex-col items-center">
                <category.img />
                {category.name}
              </div>
            ) : (
              category.name
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
