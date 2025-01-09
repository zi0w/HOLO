import Layout from "@/app/recommend/_layout/Layout";
import { useState } from "react";
import type { Answer } from "@/app/recommend/_types/answer";
import AnswerList3 from "@/app/recommend/_components/AnswerList3";

type QuestionProps = {
  prevSelectedAnswer: string;
  onNext: (data: Pick<Answer, "answer3">) => void;
  onPrev: () => void;
};

const Question3 = ({ prevSelectedAnswer, onNext, onPrev }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] =
    useState<Answer["answer3"]>(prevSelectedAnswer);

  const handleNext = () => {
    onNext({ answer3: selectedAnswer });
  };
  return (
    <Layout
      question="매운 음식 어때요?"
      onPrev={onPrev}
      handleClick={handleNext}
    >
      <AnswerList3
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
      />
    </Layout>
  );
};

export default Question3;

