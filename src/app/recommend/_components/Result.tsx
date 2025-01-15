import fetchRecommendation from "@/app/recommend/_actions/fetchRecommendation";
import type { Answer } from "@/app/recommend/_types/answer";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      alert("추천 메뉴를 불러오지 못했습니다.");
    }
  };

  const shareResult = async () => {
    try {
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
      const url = `${window.location.origin}/recommend/result?id=${id}`;

      if (navigator.share) {
        await navigator.share({
          text: "저의 추천 메뉴를 확인해보세요!",
          url,
        });
      } else {
        alert(`URL을 복사하여 공유해보세요: ${url}`);
      }
    } catch (error) {
      console.error("결과 공유에 실패했습니다.", error);
      alert("결과 공유에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const saveResult = async () => {
    try {
      const resultElement = document.querySelector(
        "#result-container",
      ) as HTMLElement;
      if (!resultElement) return;

      const canvas = await html2canvas(resultElement); // 화면 캡쳐
      const dataURL = canvas.toDataURL("image/png"); // png 형식으로 데이터 변환
      saveAs(dataURL, "result.png");
    } catch (error) {
      console.error("결과 저장 중 오류가 발생했습니다.", error);
      alert("결과 저장에 실패했습니다.");
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
        <button onClick={saveResult}>결과 저장</button>
        <button onClick={shareResult}>공유하기</button>
      </div>
    </div>
  );
};

export default Result;
