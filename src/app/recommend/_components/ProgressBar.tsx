"use client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type ProgressBarProps = {
  start: number;
  end: number;
};

const ProgressBar = ({ start, end}: ProgressBarProps) => {
  const [width, setWidth] = useState(start);

  useEffect(() => {
    setWidth(end);
  }, [end]);


  return (
    <div
      className={clsx(
        "h-2 fixed bg-[#cccccc]", // 공통
        "top-[60px] left-0 w-full", // 모바일
        "lg:top-0 lg:left-[240px] lg:w-[calc(100%-240px)]" // 데스크탑
      )}
    >
      <div
        className={`fixed h-2 bg-green-400`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ProgressBar), { ssr: false });
