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
    <div className="flex w-full flex-col justify-start gap-4 mt-8 min-h-[384px]">
      {answerItems.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onAnswerSelect(item)}
          className={clsx("border border-primary-900 h-[84px] rounded bg-primary-50 font-gmarket text-lg text-primary-900", {
            "!bg-primary-900 text-white": selectedAnswer === item,
          })}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default AnswerList;
