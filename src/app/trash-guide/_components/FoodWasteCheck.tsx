"use client";

import { fetchOpenAiFoodWaste } from "@/app/trash-guide/_actions/actions";
import clsx from "clsx";
import { useState, type ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

const FoodWasteCheck = () => {
  const [foodWaste, setFoodWaste] = useState<string>("");
  const [submittedFoodWaste, setSubmittedFoodWaste] = useState<string>("");
  const [isWasteFoodAnswer, setIsWasteFoodAnswer] = useState<string | null>(
    null,
  );
  const [wasteFoodAnswer, setWasteFoodAnswer] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeFoodWaste = (e: ChangeEvent<HTMLInputElement>): void => {
    setFoodWaste(e.target.value);
  };

  const handleSubmitFoodWaste = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const answer = await fetchOpenAiFoodWaste(foodWaste);
      const content = answer?.choices[0]?.message?.content;
      if (content) {
        setIsWasteFoodAnswer(content);
        setWasteFoodAnswer(JSON.parse(content));
      }
    } catch (error) {
      console.error(error);
      throw Error("음식물쓰레기 여부를 알려주는 OpenAI 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setSubmittedFoodWaste(foodWaste);
    }
  };

  return (
    <div>
      <p>음식물 쓰레기 여부 확인</p>
      <form
        onSubmit={handleSubmitFoodWaste}
        className="flex items-center gap-3"
      >
        <input
          type="text"
          name="prog"
          id="prog"
          className="border border-yellow-500"
          onChange={handleChangeFoodWaste}
          placeholder="확인할 쓰레기를 입력해주세요."
        />
        <button
          type="submit"
          className={clsx("h-5 w-5", {
            "bg-yellow-400": foodWaste,
            "bg-gray-400": !foodWaste,
          })}
          disabled={!foodWaste}
        >
          <CiSearch />
        </button>
      </form>
      {!isWasteFoodAnswer && !loading && (
        <div>확인할 쓰레기를 입력해주세요.</div>
      )}
      {/* TODO: 로딩바꾸기 */}
      {loading && <div>음식물 쓰레기 여부를 확인 중입니다...</div>}
      {isWasteFoodAnswer ? (
        <div>
          <strong>#{submittedFoodWaste}</strong>
          {wasteFoodAnswer ? (
            <>
              <p>
                {submittedFoodWaste}은(는) 음식물 쓰레기가
                <span className="text-blue-600">맞습니다</span>
              </p>
              {/* TODO: Image태그로 바꾸기 */}
              <img src="https://via.placeholder.com/220x220" alt="음쓰아이콘" />
            </>
          ) : (
            <>
              <p>
                {submittedFoodWaste}은(는) 음식물 쓰레기가{" "}
                <span className="text-red-600">아닙니다</span>
              </p>
              {/* TODO: Image태그로 바꾸기 */}
              <img src="https://via.placeholder.com/220x220" alt="일쓰아이콘" />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FoodWasteCheck;
