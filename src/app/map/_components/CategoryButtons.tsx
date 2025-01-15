import type { Place } from "@/app/map/_types/map";
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
};

const CATEGORIES = [
  { id: 0, name: "맛집" },
  { id: 1, name: "카페" },
  { id: 2, name: "다이소" },
  { id: 3, name: "미용실" },
  { id: 4, name: "병원" },
  { id: 5, name: "약국" },
  { id: 6, name: "세탁소" },
  { id: 7, name: "행정복지센터" },
  { id: 8, name: "헬스장" },
  { id: 9, name: "은행" },
];

const CategoryButtons = ({
  setCategory,
  setSelectedPlace,
  setPlaceDetail,
}: CategoryButtonsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  return (
    <div className="relative border-b-2 py-4">
      <div className="flex snap-x space-x-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={clsx(
              "flex-shrink-0 rounded px-4 py-2 text-sm",
              selectedCategory === category.name ? "text-orange-500" : "",
            )}
            onClick={() => {
              setCategory(category.name);
              setSelectedCategory(category.name);
              setSelectedPlace(null);
              setPlaceDetail(null);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
