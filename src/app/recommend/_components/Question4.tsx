import Layout from "@/app/recommend/_layout/Layout";
import { useState } from "react";
import type { Answer } from "@/app/recommend/_types/answer";
import AnswerList4 from "@/app/recommend/_components/AnswerList4";

type QuestionProps = {
  prevSelectedAnswer: string;
  onNext: (data: Pick<Answer, "answer4">) => void;
  onPrev: () => void;
};

const Question4 = ({ prevSelectedAnswer, onNext, onPrev }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] =
    useState<Answer["answer4"]>(prevSelectedAnswer);

  const handleNext = () => {
    onNext({ answer4: selectedAnswer });
  };
  return (
    <Layout
      question="다이어트 중이신가요?"
      onPrev={onPrev}
      handleClick={handleNext}
    >
      <AnswerList4
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
      />
    </Layout>
  );
};

export default Question4;

