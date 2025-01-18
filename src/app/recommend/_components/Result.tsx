import fetchRecommendation from "@/app/recommend/_actions/fetchRecommendation";
import type { Answer } from "@/app/recommend/_types/answer";
import SaveResultButton from "@/components/daily/SaveResultButton";
import ShareLinkButton from "@/components/daily/ShareLinkButton";
import { generateShareLink } from "@/lib/utils/daily/shareLink";
import Link from "next/link";
import { useEffect, useState } from "react";

type ResultProps = {
  answerData: Answer;
};

const Result = ({ answerData }: ResultProps) => {
  const [menuRecommendation, setMenuRecommendation] = useState<string>("");
  const [shareLink, setShareLink] = useState<string>("");

  const fetchAndGenerateLink = async () => {
    try {
      // 추천 결과 받아오기
      const recommendation = await fetchRecommendation(answerData);
      setMenuRecommendation(recommendation);

      // 공유 링크 생성
      const link = await generateShareLink(recommendation);
      setShareLink(link)
    } catch (error) {
      console.error(error);
      alert("추천 메뉴를 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    fetchAndGenerateLink();
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
