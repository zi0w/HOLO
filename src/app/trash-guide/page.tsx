import FoodWasteCheck from "@/app/trash-guide/_components/FoodWasteCheck";
import WasteDaySelector from "@/app/trash-guide/_components/WasteDaySelector";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "쓰레기 가이드",
  description: "우리 동네 쓰레기 배출 일정과 분리배출 정보",
};

const page = () => {
  return (
    <div>
      <div>
        <h2>쓰레기 가이드</h2>
        <p>우리 동네 쓰레기 배출 일정과 분리배출 정보</p>
      </div>
      <div className="mx-auto max-w-xl border border-yellow-500">
        <WasteDaySelector />
        <hr className="my-5" /> {/* TODO: 이후 구분선삭제 */}
        <FoodWasteCheck />
      </div>
    </div>
  );
};

export default page;
