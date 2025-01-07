import FoodWasteCheck from "@/app/trash/_components/FoodWasteCheck";
import WasteDaySelector from "@/app/trash/_components/WasteDaySelector";

const WasteContainer = () => {
  return (
    <div className="mx-auto max-w-xl border border-yellow-500">
      <WasteDaySelector />
      <hr className="my-5" /> {/* TODO: 이후 구분선삭제 */}
      <FoodWasteCheck />
    </div>
  );
};

export default WasteContainer;
