"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";

type ProgressBarProps = {
  start: number;
  end: number;
  label: string;
};

const ProgressBar = ({ start, end, label }: ProgressBarProps) => {
  const [width, setWidth] = useState(start);

  useEffect(() => {
    setWidth(end);
  }, [end]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-base text-base-800 font-bold mt-20 lg:mt-10">{label}</span>
      <div
        className={clsx(
          "relative h-2 w-full bg-primary-100", // 공통
          "mt-4", // 모바일
          "lg:top-0", // 데스크탑
        )}
      >
        <div
          // className={`absolute left-0 top-0 h-2 bg-primary-500 rounded-r-3xl`}
          className={clsx("absolute left-0 top-0 h-2 bg-primary-500", {
            "rounded-r-3xl": end < 100
          })}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
