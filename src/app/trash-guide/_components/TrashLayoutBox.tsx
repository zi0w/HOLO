import FoodWasteCheck from "@/app/trash-guide/_components/FoodWasteCheck";
import WasteDaySelector from "@/app/trash-guide/_components/WasteDaySelector";
import DayIcon from "@/assets/images/trash/day-icon.svg";
import FoodIcon from "@/assets/images/trash/food-icon.svg";
import clsx from "clsx";

const TrashLayoutBox = ({ isWasteDay }: { isWasteDay: boolean }) => {
  return (
    <div
      className={clsx(
        "h-[calc(100vh-280px)] relative rounded bg-white p-5 shadow-custom",
        {
          "pb-0": !isWasteDay,
        },
      )}
    >
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        {isWasteDay ? <DayIcon /> : <FoodIcon />}
      </div>
      <h2 className="common-title mb-6 pt-3 text-center">
        {isWasteDay ? (
          <>
            지역별 쓰레기 <br className="lg:hidden" /> 배출 요일 확인
          </>
        ) : (
          <>
            음식물 쓰레기 <br className="lg:hidden" /> 여부 확인
          </>
        )}
      </h2>
      {isWasteDay ? <WasteDaySelector /> : <FoodWasteCheck />}
    </div>
  );
};

export default TrashLayoutBox;
