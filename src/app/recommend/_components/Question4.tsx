import AnswerList4 from "@/app/recommend/_components/AnswerList4";
import Layout from "@/app/recommend/_layout/Layout";
import type { Answer } from "@/app/recommend/_types/answer";
import { useState } from "react";

type QuestionProps = {
  selectedAnswer: string;
  onNext: (data: Pick<Answer, "answer4">) => void;
  onPrev: (data: Pick<Answer, "answer4">) => void;
};

const Question4 = ({ selectedAnswer, onNext, onPrev }: QuestionProps) => {
  const [currentAnswer, setCurrentAnswer] =
    useState<Answer["answer4"]>(selectedAnswer);

  const handleNext = () => {
    onNext({ answer4: currentAnswer });
  };

  const handlePrev = () => {
    onPrev({ answer4: currentAnswer });
  };
  return (
    <Layout
      question="다이어트 중이신가요?"
      onPrev={handlePrev}
      handleClick={handleNext}
    >
      <AnswerList4
        selectedAnswer={currentAnswer}
        onAnswerSelect={setCurrentAnswer}
      />
    </Layout>
  );
};

export default Question4;
