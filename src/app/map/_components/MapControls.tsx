import LocationModal from "@/app/map/_components/LocationModal";
import Location from "@/assets/images/map/location.svg";
import Minus from "@/assets/images/map/minus.svg";
import Plus from "@/assets/images/map/plus.svg";
import { useLocationModalStore } from "@/store/locationmodal/useLocationModalStore";

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
  const { isOpen, modalType, closeModal } = useLocationModalStore();

  const handleAction = () => {
    closeModal();
  };

  return (
    <>
      {/* 내 위치 버튼*/}
      <button
        className="mb-2.5 h-9 w-9 rounded border border-base-700 bg-white shadow hover:bg-gray-300"
        onClick={onClickMoveCurrentPosition}
      >
        <Location className="mx-auto" />
      </button>
      <div className="flex h-16 w-9 flex-col rounded border border-base-700 shadow">
        <button
          className="h-8 w-full rounded-t border-b border-base-700 bg-white hover:bg-gray-300"
          onClick={onClickPlusMapLevel} // 확대
        >
          <Plus className="mx-auto" />
        </button>
        <button
          className="h-8 w-full rounded-b bg-white hover:bg-gray-300"
          onClick={onClickMinusMapLevel} // 축소
        >
          <Minus className="mx-auto" />
        </button>
      </div>

      <LocationModal
        isOpen={isOpen}
        modalType={modalType}
        onAction={handleAction}
        onClose={closeModal}
      />
    </>
  );
};

export default MapControls;
