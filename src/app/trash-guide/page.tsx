import FoodWasteCheck from "@/app/trash-guide/_components/FoodWasteCheck";
import TrashLayoutBox from "@/app/trash-guide/_components/TrashLayoutBox";
import WasteDaySelector from "@/app/trash-guide/_components/WasteDaySelector";
import DayIcon from "@/assets/images/trash/day-icon.svg";
import FoodIcon from "@/assets/images/trash/food-icon.svg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "쓰레기 가이드",
  description: "우리 동네 쓰레기 배출 일정과 분리배출 정보",
  openGraph: {
    title: "쓰레기 가이드",
    description: "우리 동네 쓰레기 배출 일정과 분리배출 정보",
  },
};

const page = () => {
  return (
    <div className="h-full bg-orange-50 px-5 pt-11">
      <TrashLayoutBox
        icon={<DayIcon />}
        title={
          <>
            지역별 쓰레기 <br className="md:hidden" /> 배출 요일 확인
          </>
        }
      >
        <WasteDaySelector />
      </TrashLayoutBox>
      <TrashLayoutBox
        icon={<FoodIcon />}
        title={
          <>
            음식물 쓰레기 <br className="md:hidden" /> 여부 확인
          </>
        }
      >
        <FoodWasteCheck />
      </TrashLayoutBox>
    </div>
  );
};

export default page;
