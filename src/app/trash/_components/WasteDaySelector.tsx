"use client";

import type { RegionData } from "@/app/trash/_types/day";
import { useQuery } from "@tanstack/react-query";

import { fetchOpenAiAnswer } from "@/app/trash/actions";
import { useState } from "react";

const fetchRegionData = async (): Promise<RegionData[]> => {
  const response = await fetch("data/district.json");
  return response.json();
};

const WasteDaySelector = () => {
  const [regionSelected, setRegionSelected] = useState<string>("");
  const [districtSelected, setDistrictSelected] = useState<string>("");
  const [wasteDayAnswer, setWasteDayAnswer] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchWasteDay = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await fetchOpenAiAnswer(regionSelected, districtSelected);
      if (result && result.length > 0) {
        setWasteDayAnswer(result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatWasteDayAnswer = (text: string) => {
    const parts = text.split("###").map((part) => part.trim());

    return parts.map((part: string, index: number) => {
      if (part) {
        const [header, ...rest] = part.split("\n");
        return (
          <div key={index}>
            <strong>{header}</strong>
            <p>{rest.length > 0 ? rest.join("\n") : ""}</p>
          </div>
        );
      }
      return null;
    });
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
          <option value="">지역선택</option>
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
          <option value="">시군구(전체) 선택</option>
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
          className="bg-yellow-300"
          disabled //TODO: open ai 할당량 무서웡,,, 이후에 지우기
        >
          조회인데 disabled걸어둠
        </button>
      </div>
      {/* TODO: 로딩 수정 */}
      {loading && (
        <div>
          {regionSelected} {districtSelected}의 쓰레기 배출 요일을
          확인중입니다...
        </div>
      )}
      <ul>
        {wasteDayAnswer ? (
          wasteDayAnswer.length > 0 ? (
            wasteDayAnswer.map((answer: string, index: number) => (
              <li key={index} className="my-3">
                {formatWasteDayAnswer(answer)}
              </li>
            ))
          ) : (
            <p>답변이 없습니다.</p>
          )
        ) : null}
      </ul>
    </div>
  );
};

export default WasteDaySelector;
