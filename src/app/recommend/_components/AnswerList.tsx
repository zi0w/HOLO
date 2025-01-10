"use client";

import clsx from "clsx";

type AnswerListProps<T> = {
  selectedAnswer: T;
  onAnswerSelect: (answer: T) => void;
  answerItems: T[];
};

const AnswerList = <T extends string>({
  selectedAnswer,
  onAnswerSelect,
  answerItems
}: AnswerListProps<T>) => {

  return (
    <div className="flex w-full flex-col justify-center gap-5">
      {answerItems.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onAnswerSelect(item)}
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

export default AnswerList;
