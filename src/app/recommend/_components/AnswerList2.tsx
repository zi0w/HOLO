"use client";

import type { Answer } from "@/app/recommend/_types/answer";
import clsx from "clsx";

type AnswerListProps = {
  prevSelectedAnswer: Answer["answer2"];
  selectedAnswer: Answer["answer2"];
  onAnswerSelect: (answer1: Answer["answer2"]) => void;
};

const answerItems = ["한식", "중식", "일식", "양식"];
const AnswerList2 = ({
  prevSelectedAnswer,
  selectedAnswer,
  onAnswerSelect,
}: AnswerListProps) => {
  const initialSelectedAnswer = prevSelectedAnswer || selectedAnswer;

  const handleClick = (answer2: Answer["answer2"]) => {
    onAnswerSelect(answer2);
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

export default AnswerList2;
