"use client";

import { fetchOpenAiFoodWaste } from "@/app/trash/_actions/actions";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const FoodWasteCheck = () => {
  const [foodWaste, setFoodWaste] = useState<string>("");
  const [submittedFoodWaste, setSubmittedFoodWaste] = useState<string>("");
  const [isFoodWasteAnswer, setIsFoodWasteAnswer] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeFoodWaste = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setFoodWaste(e.target.value);
  };

  const handleSubmitFoodWaste = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const answer = await fetchOpenAiFoodWaste(foodWaste);
      if (answer?.choices[0]?.message?.content) {
        setIsFoodWasteAnswer(answer.choices[0].message.content);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSubmittedFoodWaste(foodWaste);
    }
  };

  return (
    <div>
      <p>음식물 쓰레기 여부 확인</p>
      <form onSubmit={handleSubmitFoodWaste}>
        <input
          type="text"
          name="prog"
          id="prog"
          className="border border-yellow-500"
          onChange={handleChangeFoodWaste}
          placeholder="확인할 쓰레기를 입력해주세요."
        />
        <button type="submit">
          <CiSearch />
        </button>
      </form>
      {/* TODO: 로딩바꾸기 */}
      {loading && <div>음식물 쓰레기 여부를 확인 중입니다...</div>}
      {isFoodWasteAnswer ? (
        <div>
          <p>#{submittedFoodWaste}</p>
          {isFoodWasteAnswer}
        </div>
      ) : null}

      {/* <div>
        <span>#달걀 껍질</span>
        <img src="https://via.placeholder.com/220x220" alt="3D아이콘" />
        <p>
          <span>달걀 껍질</span>은(는) 음식물 쓰레기가{" "}
          <strong className="text-red-500">아닙니다!</strong>
        </p>
      </div> */}
    </div>
  );
};

export default FoodWasteCheck;
