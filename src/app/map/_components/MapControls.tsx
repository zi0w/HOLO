import Location from "@/assets/images/map/location.svg";
import Minus from "@/assets/images/map/minus.svg";
import Plus from "@/assets/images/map/plus.svg";

type MapControlsProps = {
  onClickPlusMapLevel: () => void;
  onClickMinusMapLevel: () => void;
  onClickMoveCurrentPosition: () => void;
};

const MapControls = ({
  onClickPlusMapLevel,
  onClickMinusMapLevel,
  onClickMoveCurrentPosition,
}: MapControlsProps) => {
  return (
    <div className="relative">
      <div className="shadow-custom absolute bottom-64 right-4 flex flex-col rounded border border-base-700">
        <button
          className="h-[44px] w-[48px] rounded-t border-b border-base-700 bg-white hover:bg-gray-300"
          onClick={onClickPlusMapLevel} // 확대
        >
          <Plus className="mx-auto" />
        </button>
        <button
          className="h-[44px] w-[48px] rounded-b bg-white shadow hover:bg-gray-300"
          onClick={onClickMinusMapLevel} // 축소
        >
          <Minus className="mx-auto" />
        </button>
      </div>
      {/* 내 위치 버튼*/}
      <button
        className="shadow-custom absolute bottom-64 left-4 z-10 rounded-full border border-base-700 bg-white p-4"
        onClick={onClickMoveCurrentPosition}
      >
        <Location />
      </button>
    </div>
  );
};

export default MapControls;
