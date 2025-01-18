"use client";

import { fetchOpenAiFoodWaste } from "@/app/trash-guide/_actions/fetchTrashOpenAi";
import FoodNoIcon from "@/assets/images/trash/foodwaste-no.png";
import FoodYesIcon from "@/assets/images/trash/foodwaste-yes.png";
import PersonIcon from "@/assets/images/main/bnr/person-trash.png";
import SearchIcon from "@/assets/images/trash/search-icon.svg";
import Loading from "@/components/common/Loading";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

const FoodWasteCheck = () => {
  const [foodWaste, setFoodWaste] = useState<string>("");
  const [submittedFoodWaste, setSubmittedFoodWaste] = useState<string>("");
  const [isWasteFoodAnswer, setIsWasteFoodAnswer] = useState<string | null>(
    null,
  );
  const [wasteFoodAnswer, setWasteFoodAnswer] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangeFoodWaste = (e: ChangeEvent<HTMLInputElement>): void => {
    setFoodWaste(e.target.value);
  };

  const handleSubmitFoodWaste = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchOpenAiFoodWaste(foodWaste);
      const content = response.content;
      if (content) {
        setIsWasteFoodAnswer(content);
        const lowerContent = content.toLowerCase().trim();
        setWasteFoodAnswer(lowerContent === "true");
      }
    } catch (error) {
      console.error(error);
      setError("음식물쓰레기 여부를 확인하는 중 오류가 발생했습니다.");
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
          <Image
            src={PersonIcon}
            className="mx-auto"
            width={258}
            height={298}
            alt="사람아이콘"
          />
        </div>
      )}

      {loading && <Loading />}

      {/* TODO: 에러 메시지 추가 */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {isWasteFoodAnswer && !loading ? (
        <div className="my-14 text-center">
          <strong className="font-bold text-primary-500">
            {submittedFoodWaste}
          </strong>
          {wasteFoodAnswer ? (
            <>
              <p className="mb-4 mt-1 text-sm text-base-700">
                {submittedFoodWaste}은(는) 음식물 쓰레기가 맞습니다!
              </p>
              <Image
                src={FoodYesIcon}
                width={200}
                height={200}
                className="mx-auto"
                alt="음쓰아이콘"
              />
            </>
          ) : (
            <>
              <p className="mb-4 mt-1 text-sm text-base-700">
                {submittedFoodWaste}은(는) 음식물 쓰레기가 아닙니다!
              </p>
              <Image
                src={FoodNoIcon}
                width={200}
                height={200}
                className="mx-auto"
                alt="음쓰아이콘"
              />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FoodWasteCheck;
