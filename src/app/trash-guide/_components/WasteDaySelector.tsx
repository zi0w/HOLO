"use client";
import { fetchOpenAiDay } from "@/app/trash-guide/_actions/actions";
import type { WasteDayAnswerData } from "@/app/trash-guide/_types/day";
import RegionSelect from "@/components/common/RegionSelect";
import { clsx } from "clsx";
import { useState } from "react";

const WasteDaySelector = () => {
  const [regionSelected, setRegionSelected] = useState<string>("");
  const [districtSelected, setDistrictSelected] = useState<string>("");
  const [districts, setDistricts] = useState<string[]>([]);

  const [wasteDayAnswer, setWasteDayAnswer] =
    useState<WasteDayAnswerData>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchWasteDay = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await fetchOpenAiDay(regionSelected, districtSelected);
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

  const handleRegionChange = (region: string, districts: string[]) => {
    setRegionSelected(region);
    setDistrictSelected("");
    setDistricts(districts);
  };

  const btnDisabled = clsx(
    "border  block w-full mt-4 py-2 rounded text-white font-gmarket",
    {
      "bg-primary-500 border-primary-500":
        regionSelected &&
        regionSelected !== "지역선택" &&
        districtSelected &&
        districtSelected !== "시군구",
      "bg-base-400 border-base-400":
        !regionSelected ||
        regionSelected === "지역선택" ||
        !districtSelected ||
        districtSelected === "시군구",
    },
  );

  return (
    <div>
      <p className="mb-4 font-bold text-base-800">지역 선택</p>
      <div className="grid grid-cols-2 gap-2">
        <RegionSelect
          selectedRegion={regionSelected}
          onChange={handleRegionChange}
        />
        <select
          name="district"
          id="district"
          className="common-select"
          onChange={(e) => setDistrictSelected(e.target.value)}
          value={districtSelected}
          disabled={!regionSelected}
        >
          <option value="시군구">시군구(전체) 선택</option>
          {districts.map((district, i) => (
            <option value={district} key={i}>
              {district}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleFetchWasteDay}
        className={btnDisabled}
        disabled={
          !regionSelected ||
          regionSelected === "지역선택" ||
          !districtSelected ||
          districtSelected === "시군구"
        }
      >
        조회
      </button>
      {!wasteDayAnswer && !loading && (
        <p className="mt-5 text-base-500">지역을 선택해주세요.</p>
      )}
      {loading && (
        <p className="mt-5 text-base-500">쓰레기 배출 요일을 확인중입니다...</p>
      )}
      {wasteDayAnswer && wasteDayAnswer.length > 0 && (
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
