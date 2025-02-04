"use client";

import { fetchOpenAiFoodWaste } from "@/app/trash-guide/_actions/fetchTrashOpenAi";
import PersonIcon from "@/assets/images/main/bnr/person-trash.png";
import FoodNoIcon from "@/assets/images/trash/foodwaste-no.png";
import FoodYesIcon from "@/assets/images/trash/foodwaste-yes.png";

import SearchForm from "@/app/trash-guide/_components/SearchForm";
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
      <SearchForm
        region={foodWaste}
        isMyLocation={false}
        handleSubmit={handleSubmitFoodWaste}
        handleChange={handleChangeFoodWaste}
        isDisabled={!foodWaste}
        placeholder="달걀 껍질은 음쓰?"
      />
      {!isWasteFoodAnswer && !loading && (
        <Image
          src={PersonIcon}
          className="absolute bottom-0 left-1/2 max-h-[275px] -translate-x-1/2 object-contain"
          width={240}
          height={275}
          alt="사람아이콘"
        />
      )}

      {loading && <Loading />}

      {/* TODO: 에러 메시지 추가 */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {isWasteFoodAnswer && !loading && (
        <div className="my-14 text-center">
          <strong className="font-bold text-primary-500">
            {submittedFoodWaste}
          </strong>
          <p className="mb-4 mt-1 text-sm text-base-700">
            {submittedFoodWaste}은(는) 음식물 쓰레기가
            {wasteFoodAnswer ? " 맞습니다!" : " 아닙니다!"}
          </p>
          <Image
            src={wasteFoodAnswer ? FoodYesIcon : FoodNoIcon}
            width={200}
            height={200}
            className="mx-auto"
            alt="음쓰아이콘"
          />
        </div>
      )}
    </div>
  );
};

export default FoodWasteCheck;
