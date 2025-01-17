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
      <span className="text-base text-base-800 font-bold">{label}</span>
      <div
        className={clsx(
          "relative h-2 w-full bg-primary-100", // 공통
          "mt-4", // 모바일
          "lg:left-[240px] lg:top-0 lg:w-[calc(100%-240px)]", // 데스크탑
        )}
      >
        <div
          className={`absolute left-0 top-0 h-2 bg-primary-500`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
