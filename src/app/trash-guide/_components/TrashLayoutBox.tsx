import FoodWasteCheck from "@/app/trash-guide/_components/FoodWasteCheck";
import WasteDaySelector from "@/app/trash-guide/_components/WasteDaySelector";
import DayIcon from "@/assets/images/trash/day-icon.svg";
import FoodIcon from "@/assets/images/trash/food-icon.svg";
import clsx from "clsx";

const TrashLayoutBox = ({ isWasteDay }: { isWasteDay: boolean }) => {
  return (
    <div
      className={clsx("relative rounded bg-white p-5 shadow-custom", {
        "pb-0": !isWasteDay,
      })}
    >
      <div className="absolute left-1/2 top-[-30px] -translate-x-1/2">
        {isWasteDay ? <DayIcon /> : <FoodIcon />}
      </div>
      <h1 className="mb-6 pt-8 text-center font-gmarket text-2xl font-bold text-base-800">
        {isWasteDay ? (
          <>지역별 쓰레기 <br className="lg:hidden" /> 배출 요일 확인</>
        ) : (
          <>음식물 쓰레기 <br className="lg:hidden" /> 여부 확인</>
        )}
      </h1>
      {isWasteDay ? <WasteDaySelector /> : <FoodWasteCheck />}
    </div>
  );
};

export default TrashLayoutBox;
