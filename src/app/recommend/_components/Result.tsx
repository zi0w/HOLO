import type { Answer } from "@/app/recommend/_types/answer";
import { useEffect, useState } from "react";
import fetchRecommendation from "../_actions/\bfetchRecommendation";

type ResultProps = {
  answerData: Answer;
};

const Result = ({ answerData }: ResultProps) => {
  const [menuRecommendation, setMenuRecommendation] = useState<string>("");

  const getRecommendation = async () => {
    try {
      const result = await fetchRecommendation(answerData); // 서버액션 호출
      setMenuRecommendation(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecommendation();
  }, [answerData]);
  return (
    <div>
      <h1>결과 페이지</h1>
      <ul>
        <li>답변 1: {answerData.answer1}</li>
        <li>답변 2: {answerData.answer2}</li>
        <li>답변 3: {answerData.answer3}</li>
        <li>답변 4: {answerData.answer4}</li>
      </ul>
      {menuRecommendation ? (
        <p>추천 메뉴: {menuRecommendation}</p>
      ) : (
        <p>추천 메뉴를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Result;
