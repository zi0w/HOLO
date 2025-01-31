"use client";
import useKakaoLoader from "@/app/map/_hooks/useKakaoLoader";
import { fetchOpenAiDay } from "@/app/trash-guide/_actions/fetchTrashOpenAi";
import SearchForm from "@/app/trash-guide/_components/SearchForm";
import type { WasteDayAnswerData } from "@/app/trash-guide/_types/trashTypes";
import Loading from "@/components/common/Loading";
import locationStore from "@/store/locationStore";
import { useEffect, useState } from "react";

const WasteDaySelector = () => {
  const [region, setRegion] = useState<string>("");
  const [wasteDayAnswer, setWasteDayAnswer] =
    useState<WasteDayAnswerData>(null);
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const [isMyLocation, setIsMyLocation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // TODO: useLocationStore 로 변경
  const getCurrentPosition = locationStore(
    (state) => state.onClickMoveCurrentPosition,
  );
  const currentPosition = locationStore((state) => state.currentPosition);

  useKakaoLoader();

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

  const handleFetchWasteDay = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await fetchOpenAiDay(region);
      if (result) {
        setWasteDayAnswer(result);
      }
    } catch (error) {
      console.error(error);
      throw Error("쓰레기 배출 요일을 알려주는 OpenAI 오류가 발생했습니다.");
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

  const handleMyLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsMyLocation(e.target.checked);
    if (e.target.checked) {
      try {
        await getCurrentPosition();
      } catch (error) {
        console.error(error);
        setRegion("위치 정보를 가져올 수 없습니다.");
        setIsValidAddress(false);
      }
    } else {
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
      {loading && <Loading />}
      {!loading && wasteDayAnswer && wasteDayAnswer.length > 0 && (
        <ul className="mt-5 grid gap-5">
          {wasteDayAnswer.map((answer, i) => (
            <li key={i}>
              {Object.entries(answer).map(([waste, day]) => (
                <div key={waste} className="text-base-800">
                  <strong>{waste}</strong>
                  <p className="mt-1">{day}</p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WasteDaySelector;
