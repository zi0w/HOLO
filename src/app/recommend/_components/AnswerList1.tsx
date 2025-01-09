"use client";

import type { Answer } from "@/app/recommend/_types/answer";
import clsx from "clsx";

type AnswerListProps = {
  selectedAnswer: Answer["answer1"];
  onAnswerSelect: (answer1: Answer["answer1"]) => void;
};

const answerItems = ["좋아요", "슬퍼요", "화나요", "그냥그래요"];
const AnswerList1 = ({
  selectedAnswer,
  onAnswerSelect,
}: AnswerListProps) => {

  const handleClick = (answer1: Answer["answer1"]) => {
    onAnswerSelect(answer1);
  };
  return (
    <div className="flex w-full flex-col justify-center gap-5">
      {answerItems.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => handleClick(item)}
          className={clsx("border", {
            "bg-blue-500 text-white": selectedAnswer === item,
          })}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default AnswerList1;
