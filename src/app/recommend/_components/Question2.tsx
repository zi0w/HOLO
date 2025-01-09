import Layout from "@/app/recommend/_layout/Layout";
import { useState } from "react";
import type { Answer } from "@/app/recommend/_types/answer";
import AnswerList2 from "@/app/recommend/_components/AnswerList2";

type QuestionProps = {
  prevSelectedAnswer: string;
  onNext: (data: Pick<Answer, "answer2">) => void;
  onPrev: () => void;
};

const Question2 = ({ prevSelectedAnswer, onNext, onPrev }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] =
    useState<Answer["answer2"]>(prevSelectedAnswer);

  const handleNext = () => {
    onNext({ answer2: selectedAnswer });
  };
  return (
    <Layout
      question="어떤 종류의 음식이 땡겨요?"
      onPrev={onPrev}
      handleClick={handleNext}
    >
      <AnswerList2
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
      />
    </Layout>
  );
};

export default Question2;
