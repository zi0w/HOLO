"use client";

import type { Answer } from "@/app/recommend/_types/answer";
import clsx from "clsx";

type AnswerListProps = {
  prevSelectedAnswer: Answer["answer3"];
  selectedAnswer: Answer["answer3"];
  onAnswerSelect: (answer3: Answer["answer3"]) => void;
};

const answerItems = ["좋아요", "싫어요"];
const AnswerList3 = ({
  prevSelectedAnswer,
  selectedAnswer,
  onAnswerSelect,
}: AnswerListProps) => {
  const initialSelectedAnswer = prevSelectedAnswer || selectedAnswer;

  const handleClick = (answer3: Answer["answer3"]) => {
    onAnswerSelect(answer3);
  };
  return (
    <div className="flex w-full flex-col justify-center gap-5">
      {answerItems.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => handleClick(item)}
          className={clsx("border", {
            "bg-blue-500 text-white": initialSelectedAnswer === item,
          })}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default AnswerList3;

