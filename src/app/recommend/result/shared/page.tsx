"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SharedResultPage = () => {
  const searchParams = useSearchParams();
  const encodedRecommendation = searchParams.get("recommendation");

  if (!encodedRecommendation) {
    return <p>유효하지 않은 URL입니다.</p>;
  }

  const recommendation = decodeURIComponent(encodedRecommendation);
  return (
    <div id="result-container" className="bg-white text-black">
      <h1>결과 페이지</h1>
      <p>추천 메뉴: {recommendation}</p>
      <Link href="/recommend">
        <button className="mt-4 border p-1">나도 하러 가기</button>
      </Link>
    </div>
  );
};
export default SharedResultPage;
