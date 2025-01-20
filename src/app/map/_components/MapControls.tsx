import Location from "@/assets/images/map/location.svg";
import Minus from "@/assets/images/map/minus.svg";
import Plus from "@/assets/images/map/plus.svg";

type MapControlsProps = {
  onClickPlusMapLevel: () => void;
  onClickMinusMapLevel: () => void;
  onClickMoveCurrentPosition: () => void;
  onClickReSearch: () => void;
};

const MapControls = ({
  onClickPlusMapLevel,
  onClickMinusMapLevel,
  onClickMoveCurrentPosition,
  // onClickReSearch, 디자이너님과 협의 필요 버튼
}: MapControlsProps) => {
  return (
    <div className="relative">
      <div className="absolute bottom-6 right-4 z-10 flex h-16 w-9 flex-col rounded border border-base-700">
        <button
          className="h-8 w-full rounded-t border-b border-base-700 bg-white hover:bg-gray-300"
          onClick={onClickPlusMapLevel} // 확대
        >
          <Plus className="mx-auto" />
        </button>
        <button
          className="h-8 w-full rounded-b bg-white shadow hover:bg-gray-300"
          onClick={onClickMinusMapLevel} // 축소
        >
          <Minus className="mx-auto" />
        </button>
      </div>
      {/* 내 위치 버튼*/}
      <button
        className="absolute bottom-24 right-4 z-10 h-9 w-9 rounded border border-base-700 bg-white hover:bg-gray-300"
        onClick={onClickMoveCurrentPosition}
      >
        <Location className="mx-auto" />
      </button>

      {/* 디자이너님과 상의 필요 */}
      {/* <button
        onClick={onClickReSearch}
        className="shadow-custom-button absolute bottom-8 left-44 z-10 rounded-full border border-base-700 bg-white p-4"
      >
        현 위치에서 검색
      </button> */}
    </div>
  );
};

export default MapControls;
