"use client";

import LocationModal from "@/app/map/_components/LocationModal";
import Location from "@/assets/images/map/location.svg";
import Minus from "@/assets/images/map/minus.svg";
import Plus from "@/assets/images/map/plus.svg";
import { useLocationModalStore } from "@/store/useLocationModalStore";

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
        type="button"
        className="mb-2.5 h-9 w-9 rounded border border-base-700 bg-white shadow hover:bg-gray-300"
        onClick={onClickMoveCurrentPosition}
        aria-label="내 위치로 이동"
      >
        <Location className="mx-auto" />
      </button>
      <div className="flex h-16 w-9 flex-col rounded border border-base-700 shadow">
        <button
          type="button"
          className="h-8 w-full rounded-t border-b border-base-700 bg-white hover:bg-gray-300"
          onClick={onClickPlusMapLevel} // 확대
          aria-label="지도 확대"
        >
          <Plus className="mx-auto" />
        </button>
        <button
          type="button"
          className="h-8 w-full rounded-b bg-white hover:bg-gray-300"
          onClick={onClickMinusMapLevel} // 축소
          aria-label="지도 축소"
        >
          <Minus className="mx-auto" />
        </button>
      </div>

      {/* 모달*/}
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
