import Layout from "@/app/recommend/_layout/Layout";
import { useState } from "react";
import type { Answer } from "@/app/recommend/_types/answer";
import AnswerList3 from "@/app/recommend/_components/AnswerList3";

type QuestionProps = {
  selectedAnswer: string;
  onNext: (data: Pick<Answer, "answer3">) => void;
  onPrev: (data: Pick<Answer, "answer3">) => void;
};

const Question3 = ({ selectedAnswer, onNext, onPrev }: QuestionProps) => {
  const [currentAnswer, setCurrentAnswer] =
    useState<Answer["answer3"]>(selectedAnswer);

  const handleNext = () => {
    onNext({ answer3: currentAnswer });
  };

  const handlePrev = () => {
    onPrev({answer3: currentAnswer})
  }
  return (
    <Layout
      question="매운 음식 어때요?"
      onPrev={handlePrev}
      handleClick={handleNext}
    >
      <AnswerList3
        selectedAnswer={currentAnswer}
        onAnswerSelect={setCurrentAnswer}
      />
    </Layout>
  );
};

export default Question3;

