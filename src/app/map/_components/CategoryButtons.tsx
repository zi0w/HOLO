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
  setCategory,
  setSelectedPlace,
  setPlaceDetail,
  isMain,
}: CategoryButtonsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  return (
    <>
      <div className="mx-5 flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {MAP_CATEGORIES.map((category) => (
          <button
            key={category.id}
            className={clsx(
              "relative mx-2.5 flex h-14 flex-shrink-0 items-center justify-center px-2.5 text-sm",
              selectedCategory === category.name
                ? "text-primary-800 after:absolute after:bottom-0 after:h-[4px] after:w-full after:rounded-3xl after:bg-primary-500"
                : "",
            )}
            onClick={() => {
              setCategory(category.name);
              setSelectedCategory(category.name);
              setSelectedPlace(null);
              setPlaceDetail(null);
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
