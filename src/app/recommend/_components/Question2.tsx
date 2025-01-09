import Layout from "@/app/recommend/_layout/Layout";
import { useState } from "react";
import type { Answer } from "@/app/recommend/_types/answer";
import AnswerList2 from "@/app/recommend/_components/AnswerList2";

type QuestionProps = {
  selectedAnswer: string;
  onNext: (data: Pick<Answer, "answer2">) => void;
  onPrev: (data: Pick<Answer, "answer2">) => void;
};

const Question2 = ({ selectedAnswer, onNext, onPrev }: QuestionProps) => {
  const [currentAnswer, setCurrentAnswer] =
    useState<Answer["answer2"]>(selectedAnswer);

  const handleNext = () => {
    onNext({ answer2: currentAnswer });
  };

  const handlePrev = () => {
    onPrev({answer2: currentAnswer})
  }
  return (
    <Layout
      question="어떤 종류의 음식이 땡겨요?"
      onPrev={handlePrev}
      handleClick={handleNext}
    >
      <AnswerList2
        selectedAnswer={currentAnswer}
        onAnswerSelect={setCurrentAnswer}
      />
    </Layout>
  );
};

export default Question2;
