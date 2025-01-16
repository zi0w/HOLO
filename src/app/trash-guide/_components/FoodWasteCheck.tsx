"use client";

import { fetchOpenAiFoodWaste } from "@/app/trash-guide/_actions/actions";
import FoodNoIcon from "@/assets/images/trash/foodwaste-no.png";
import FoodYesIcon from "@/assets/images/trash/foodwaste-yes.png";
import PersonIcon from "@/assets/images/trash/person.png";
import SearchIcon from "@/assets/images/trash/search-icon.svg";
import { useState, type ChangeEvent } from "react";

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
      <form
        onSubmit={handleSubmitFoodWaste}
        className="flex items-center gap-1 rounded border border-base-400 px-3 py-2"
      >
        <button type="submit" disabled={!foodWaste}>
          <SearchIcon />
        </button>
        <input
          type="text"
          name="prog"
          id="prog"
          className="w-full border-none text-base-600 focus:bg-transparent focus:outline-none"
          onChange={handleChangeFoodWaste}
          placeholder="달걀 껍질은 음쓰?"
        />
      </form>
      {!isWasteFoodAnswer && !loading && (
        <div className="mt-20">
          <img src={PersonIcon.src} className="mx-auto" alt="사람아이콘" />
        </div>
      )}

      {/* TODO: 로딩바꾸기 */}
      {loading && <p>로딩중</p>}

      {isWasteFoodAnswer && !loading ? (
        <div className="my-14 text-center">
          <strong className="font-bold text-primary-500">
            {submittedFoodWaste}
          </strong>
          {wasteFoodAnswer ? (
            <>
              <p className="mb-4 mt-1 text-sm text-base-700">
                {submittedFoodWaste}은(는) 음식물 맞습니다!
              </p>
              <img src={FoodYesIcon.src} className="mx-auto" alt="음쓰아이콘" />
            </>
          ) : (
            <>
              <p className="mb-4 mt-1 text-sm text-base-700">
                {submittedFoodWaste}은(는) 음식물 쓰레기가 아닙니다!
              </p>
              <img src={FoodNoIcon.src} className="mx-auto" alt="음쓰아이콘" />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FoodWasteCheck;
