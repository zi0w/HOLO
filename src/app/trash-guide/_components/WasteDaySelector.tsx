"use client";
import { fetchOpenAiDay } from "@/app/trash-guide/_actions/fetchTrashOpenAi";
import SearchForm from "@/app/trash-guide/_components/SearchForm";
import type { WasteDayAnswerData } from "@/app/trash-guide/_types/trashTypes";
import Loading from "@/components/common/Loading";
import { useState } from "react";

const WasteDaySelector = () => {
  const [region, setRegion] = useState<string>("");
  const [wasteDayAnswer, setWasteDayAnswer] =
    useState<WasteDayAnswerData>(null);

  const [loading, setLoading] = useState<boolean>(false);

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
    setRegion(e.target.value);
  };

  return (
    <div>
      <p className="mb-4 font-bold text-base-800">주소 검색</p>
      <SearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isDisabled={!region}
        placeholder="서울 용산구 한남동"
      />
      {loading && <Loading />}
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
