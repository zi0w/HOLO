"use client";

import fetchDailyFortune from "@/app/recommend/_actions/fetchDailyFortune";
import Link from "next/link";
import { useEffect, useState } from "react";

const FortunePage = () => {
  const [fortune, setFortune] = useState<string>("");

  const getDailyFortune = async () => {
    try {
      const result = await fetchDailyFortune();
      setFortune(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDailyFortune();
  }, []);

  return (
    <div>
      <h1>오늘 당신의 운세는!</h1>
      {fortune ? <p>{fortune}</p> : <p>오늘 운세를 불러오는 중...</p>}
      <Link href="/recommend">
        <button className="mt-4 border p-1">추천 다시 받기</button>
      </Link>
    </div>
  );
};

export default FortunePage;
