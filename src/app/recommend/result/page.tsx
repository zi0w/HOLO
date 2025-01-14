"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SharedResultPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [recommendation, setRecommendation] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/recommend?id=${id}`); // GET요청
      if (!response.ok) {
        throw new Error("데이터를 받아오는 데에 실패했습니다.");
      }

      const { data } = await response.json();
      setRecommendation(data);
    } catch (error) {
      console.error("데이터를 받아오는 데에 실패했습니다.", error);
      setRecommendation("데이터를 불러올 수 없습니다.");
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (!id) {
    return <p>유효하지 않은 url입니다.</p>;
  }

  return (
    <div id="result-container" className="bg-white text-black">
      <h1>결과 페이지</h1>
      <p>추천 메뉴: {recommendation}</p>
      <Link href="/recommend" className="mt-4 border p-1">
        나도 하러 가기
      </Link>
    </div>
  );
};
export default SharedResultPage;
