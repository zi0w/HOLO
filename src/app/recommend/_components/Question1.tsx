import type { Answer } from "@/app/recommend/_types/answer";
import { useState } from "react";
import Layout from "@/app/recommend/_layout/Layout";
import AnswerList1 from "@/app/recommend/_components/AnswerList1";

type QuestionProps = {
  prevSelectedAnswer: string;
  onNext: (data: Pick<Answer, "answer1">) => void;
};

const Question1 = ({ prevSelectedAnswer, onNext }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] =
    useState<Answer["answer1"]>(prevSelectedAnswer);

  const handleNext = () => {
    onNext({ answer1: selectedAnswer });
  };
  return (
    <Layout question="오늘 기분이 어때요?" handleClick={handleNext}>
      <AnswerList1
        prevSelectedAnswer={prevSelectedAnswer}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
      />
    </Layout>
  );
};

export default Question1;
