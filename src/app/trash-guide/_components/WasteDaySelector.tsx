"use client";
import LocationModal from "@/app/map/_components/LocationModal";
import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import { fetchOpenAiDay } from "@/app/trash-guide/_actions/fetchTrashOpenAi";
import SearchForm from "@/app/trash-guide/_components/SearchForm";
import WasteDayResult from "@/app/trash-guide/_components/WasteDayResult";
import type { WasteDayAnswerData } from "@/app/trash-guide/_types/trashTypes";
import { useLocationModalStore } from "@/store/locationmodal/useLocationModal";
import locationStore from "@/store/useLocationStore";
import { useEffect, useState } from "react";

const WasteDaySelector = () => {
  const [region, setRegion] = useState<string>("");
  const [wasteDayAnswer, setWasteDayAnswer] =
    useState<WasteDayAnswerData>(null);

  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const [isMyLocation, setIsMyLocation] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isOpen, modalType, closeModal } = useLocationModalStore();

  const handleAction = () => {
    setIsMyLocation(false);
    closeModal();
  };

  const getCurrentPosition = locationStore(
    (state) => state.onClickMoveCurrentPosition,
  );

  const currentPosition = locationStore((state) => state.currentPosition);

  useEffect(() => {
    if (isMyLocation && currentPosition?.lng && currentPosition?.lat) {
      if (!window.kakao?.maps) {
        console.error("카카오맵 SDK가 로드되지 않았습니다.");
        setRegion("카카오맵 서비스를 불러올 수 없습니다.");
        setIsValidAddress(false);
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(
        currentPosition.lng,
        currentPosition.lat,
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const regionObj = result[0];
            const fullAddress =
              `${regionObj.region_1depth_name} ${regionObj.region_2depth_name} ${regionObj.region_3depth_name || ""}`.trim();
            setRegion(fullAddress);
            setIsValidAddress(true);
          } else {
            console.error(status);
            setRegion("주소를 확인할 수 없습니다.");
            setIsValidAddress(false);
          }
        },
      );
    }
  }, [currentPosition, isMyLocation]);

  useKakaoLoader();

  const handleFetchWasteDay = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchOpenAiDay(region);
      if (result) {
        setWasteDayAnswer(result);
      } else {
        setError("조회된 결과가 없습니다.");
      }
    } catch (error) {
      console.error(error);
      throw new Error("쓰레기 배출 요일을 조회하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    handleFetchWasteDay();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegion(value);

    const addressPattern =
      /^[가-힣]+(시|도)\s[가-힣]+(시|군|구)(\s[가-힣]+(구))?(\s[가-힣]+동)?$/;
    setIsValidAddress(addressPattern.test(value));
  };

  const handleMyLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsMyLocation(e.target.checked);
      getCurrentPosition();
    } else {
      setIsMyLocation(false);
      setRegion("");
      setIsValidAddress(false);
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-bold text-base-800">주소 검색</p>
        <div className="form-wrap">
          <input
            type="checkbox"
            name="chk"
            id="chk"
            checked={isMyLocation}
            onChange={handleMyLocationChange}
          />
          <label htmlFor="chk">내 위치 불러오기</label>
        </div>
      </div>
      <SearchForm
        region={region}
        isMyLocation={isMyLocation}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isDisabled={!isValidAddress}
        placeholder="시군구동 형식으로 입력해주세요 (예: 서울시 강남구 역삼동)"
      />
      <WasteDayResult
        loading={loading}
        error={error}
        wasteDayAnswer={wasteDayAnswer}
      />
      <LocationModal
        isOpen={isOpen}
        modalType={modalType}
        onAction={handleAction}
        onClose={closeModal}
      />
    </div>
  );
};

export default WasteDaySelector;
