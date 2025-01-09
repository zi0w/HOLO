"use client";

import type { RegionData, WasteDayAnswerData } from "@/app/trash/_types/day";
import { useQuery } from "@tanstack/react-query";

import { fetchOpenAiDay } from "@/app/trash/_actions/actions";
import { clsx } from "clsx";
import { useState } from "react";

const fetchRegionData = async (): Promise<RegionData[]> => {
  const response = await fetch("data/district.json");
  return response.json();
};

const WasteDaySelector = () => {
  const [regionSelected, setRegionSelected] = useState<string>("");
  const [districtSelected, setDistrictSelected] = useState<string>("");
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
    } finally {
      setLoading(false);
    }
  };

  const {
    data: regionData,
    isPending,
    error,
  } = useQuery<RegionData[]>({
    queryKey: ["regionData"],
    queryFn: fetchRegionData,
  });

  const handleChangeRegion = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setRegionSelected(e.target.value);
    setDistrictSelected("");
  };

  //TODO: 버튼 스타일 바꾸기
  const btnDisabled = clsx("border border-yellow-500", {
    // 활성화시
    "bg-yellow-500":
      regionSelected &&
      regionSelected !== "지역선택" &&
      districtSelected &&
      districtSelected !== "시군구",
    // 비활성화시
    "bg-gray-400":
      !regionSelected ||
      regionSelected === "지역선택" ||
      !districtSelected ||
      districtSelected === "시군구",
  });

  if (isPending) return <div>로딩중</div>; // TODO: 로딩 바꾸기
  if (error instanceof Error) return <div>에러: {error.message}</div>; // TODO: 에러처리 바꾸기

  return (
    <div>
      <p>지역별 쓰레기 배출 요일 확인</p>
      <div>
        <p>지역선택</p>
        <select
          name="region"
          id="region"
          className="border border-yellow-500"
          onChange={handleChangeRegion}
          value={regionSelected}
        >
          <option value="지역선택">지역선택</option>
          {regionData?.map((region, i) => (
            <option value={Object.keys(region)[0]} key={i}>
              {Object.keys(region)[0]}
            </option>
          ))}
        </select>
        <select
          name="district"
          id="district"
          className="border border-yellow-500"
          onChange={(e) => setDistrictSelected(e.target.value)}
          value={districtSelected}
          disabled={!regionSelected}
        >
          <option value="시군구">시군구(전체) 선택</option>
          {regionData
            ?.find((region) => Object.keys(region)[0] === regionSelected) // 선택한 지역을 data에서 찾기
            ?.[regionSelected]?.map(
              (
                district: string,
                i: number, // 찾은 지역의 시군구 목록을 옵션으로 만들기
              ) => (
                <option value={district} key={i}>
                  {district}
                </option>
              ),
            )}
        </select>
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
      </div>
      {/* TODO: ai 답변전 텍스트 수정 */}
      {!wasteDayAnswer && !loading && <div>지역을 선택해주세요.</div>}
      {/* TODO: 로딩 수정 */}
      {loading && <div>쓰레기 배출 요일을 확인중입니다...</div>}
      <ul>
        {wasteDayAnswer?.map((answer, i) => (
          <li key={i} className="my-3">
            {Object.entries(answer).map(([waste, day]) => (
              <div key={waste}>
                <strong>{waste}</strong>
                <p>{day}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WasteDaySelector;
