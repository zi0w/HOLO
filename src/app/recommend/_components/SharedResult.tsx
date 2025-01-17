"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic" // TODO: 임시방편 -> 수정 필요

const SharedResult = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [recommendation, setRecommendation] = useState<string>("");

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/recommend?id=${id}`);
      if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");

      const { data } = await response.json();
      setRecommendation(data);
    } catch (error) {
      console.error(error);
      setRecommendation("데이터를 불러올 수 없습니다.");
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (!id) {
    return <p>유효하지 않은 URL입니다.</p>;
  }

  return (
    <>
      <p>추천 메뉴: {recommendation}</p>
      <Link href="/recommend" className="mt-4 border p-1">
        나도 하러 가기
      </Link>
    </>
  );
};

export default SharedResult;
