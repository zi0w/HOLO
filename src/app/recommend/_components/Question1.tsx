import AnswerList1 from "@/app/recommend/_components/AnswerList1";
import Layout from "@/app/recommend/_layout/Layout";
import type { Answer } from "@/app/recommend/_types/answer";
import { useState } from "react";

type QuestionProps = {
  selectedAnswer: string; // 초기값 전달
  onNext: (data: Pick<Answer, "answer1">) => void;
};

const Question1 = ({ selectedAnswer, onNext }: QuestionProps) => {
  const [currentAnswer, setCurrentAnswer] =
    useState<Answer["answer1"]>(selectedAnswer); // 초기값 설정

  const handleNext = () => {
    onNext({ answer1: currentAnswer }); // 부모 상태 업데이트
  };
  return (
    <Layout question="오늘 기분이 어때요?" handleClick={handleNext}>
      <AnswerList1
        selectedAnswer={currentAnswer}
        onAnswerSelect={setCurrentAnswer}
      />
    </Layout>
  );
};

export default Question1;
