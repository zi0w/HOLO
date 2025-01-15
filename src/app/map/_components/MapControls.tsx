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
    <>
      <div className="absolute bottom-72 right-4 flex flex-col space-y-2">
        <button
          className="rounded bg-white p-2 shadow hover:bg-gray-300"
          onClick={onClickPlusMapLevel} // 확대
        >
          +
        </button>
        <button
          className="rounded bg-white p-2 shadow hover:bg-gray-300"
          onClick={onClickMinusMapLevel} // 축소
        >
          −
        </button>
      </div>
      {/* 내 위치 버튼*/}
      <button
        className="absolute bottom-60 left-10 z-10 rounded bg-white p-2 shadow hover:bg-blue-400"
        onClick={onClickMoveCurrentPosition}
      >
        내 위치
      </button>
    </>
  );
};

export default MapControls;
