import fetchRecommendation from "@/app/recommend/_actions/fetchRecommendation";
import type { Answer } from "@/app/recommend/_types/answer";
import SaveResultButton from "@/components/daily/SaveResultButton";
import ShareLinkButton from "@/components/daily/ShareLinkButton";
import Link from "next/link";
import { useEffect, useState } from "react";

type ResultProps = {
  answerData: Answer;
};

const Result = ({ answerData }: ResultProps) => {
  const [menuRecommendation, setMenuRecommendation] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");

  const getRecommendation = async () => {
    try {
      const result = await fetchRecommendation(answerData); // 서버액션 호출
      setMenuRecommendation(result);

      // 공유 링크 생성
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ data: menuRecommendation }),
      });

      if (!response.ok) {
        alert("결과 공유에 실패했습니다. 다시 시도해주세요.");
        throw new Error("데이터 저장 실패");
      }

      const { id } = await response.json();
      setShareLink(`${window.location.origin}/recommend/result?id=${id}`);
    } catch (error) {
      console.error(error);
      alert("추천 메뉴를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    getRecommendation();
  }, [answerData]);

  return (
    <div id="result-container" className="bg-white text-black">
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
      <Link href="/recommend" className="mt-4 border p-1">
        추천 다시 받기
      </Link>
      <div className="mt-4 flex gap-4 pb-4">
        <SaveResultButton elementId="result-container" />
        <ShareLinkButton link={shareLink} />
      </div>
    </div>
  );
};

export default Result;
