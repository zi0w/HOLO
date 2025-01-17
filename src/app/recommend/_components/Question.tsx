import AnswerList from "@/app/recommend/_components/AnswerList";
import Layout from "@/app/recommend/_layout/Layout";
import type { Answer } from "@/app/recommend/_types/answer";
import { useState } from "react";

type QuestionProps<T extends keyof Answer> = {
  question: string;
  selectedAnswer: Answer[T]; // 초기값 전달
  answerItems: Answer[T][];
  onNext: (data: Pick<Answer, T>) => void;
  onPrev?: (data: Pick<Answer, T>) => void;
  fieldKey: T;
};

// 제네릭은 컴포넌트마다 명시적 선언 필요
const Question = <T extends keyof Answer>({
  question,
  selectedAnswer,
  answerItems,
  onNext,
  onPrev,
  fieldKey,
}: QuestionProps<T>) => {
  const [currentAnswer, setCurrentAnswer] = useState(selectedAnswer || ""); // 초기값 설정

  const handleNext = () => {
    onNext({ [fieldKey]: currentAnswer } as Pick<Answer, T>); // 부모 상태 업데이트
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev({ [fieldKey]: currentAnswer } as Pick<Answer, T>);
    }
  };

  return (
    <Layout
      question={question}
      onPrev={onPrev ? handlePrev : undefined}
      handleClick={handleNext}
    >
      <AnswerList
        selectedAnswer={currentAnswer}
        onAnswerSelect={setCurrentAnswer}
        answerItems={answerItems}
      />
    </Layout>
  );
};

export default Question;
