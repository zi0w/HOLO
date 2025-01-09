"use client";

import type { Answer } from "@/app/recommend/_types/answer";
import clsx from "clsx";

type AnswerListProps = {
  selectedAnswer: Answer["answer4"];
  onAnswerSelect: (answer4: Answer["answer4"]) => void;
};

const answerItems = ["네", "아니요"];
const AnswerList4 = ({
  selectedAnswer,
  onAnswerSelect,
}: AnswerListProps) => {

  const handleClick = (answer4: Answer["answer4"]) => {
    onAnswerSelect(answer4);
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

export default AnswerList4;

