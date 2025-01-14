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

  const shareResult = () => {
    const queryParams = new URLSearchParams({
      recommendation: encodeURIComponent(menuRecommendation)
    }).toString();

    const shareUrl = `${window.location.origin}/result/shared?${queryParams}`

    if (navigator.share) {
      navigator.share({
        title: "추천 메뉴",
        text: "저의 추천 메뉴를 확인해보세요!",
        url: shareUrl
      }).then(() =>  console.log("공유 성공!"))
      .catch((error) => console.error("공유 실패:", error))
    } else {
      alert("이 브라우저는 공유 기능을 지원하지 않습니다.")
    }
  }

  const saveResult = async () => {
    try {
      const resultElement = document.querySelector(
        "#result-container",
      ) as HTMLElement;
      if (!resultElement) return;

      const canvas = await html2canvas(resultElement); // 화면 캡쳐
      const dataURL = canvas.toDataURL("image/png"); // png 형식으로 데이터 변환
      saveAs(dataURL, "result.png")
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
      <Link href="/recommend">
        <button className="mt-4 border p-1">추천 다시 받기</button>
      </Link>
      <div className="mt-4 flex gap-4 pb-4">
        <button onClick={saveResult}>결과 저장</button>
        <button onClick={shareResult}>공유하기</button>
      </div>
    </div>
  );
};

export default Result;
