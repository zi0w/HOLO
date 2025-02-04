"use client";

import TrashLayoutBox from "@/app/trash-guide/_components/TrashLayoutBox";
import { TAB_ITEMS } from "@/app/trash-guide/_constants/tab";
import DayIcon from "@/assets/images/trash/day-icon.svg";
import FoodIcon from "@/assets/images/trash/search-icon.svg";
import clsx from "clsx";
import { useState } from "react";

const TrashContainer = () => {
  const [activeTab, setActiveTab] = useState("wasteDay");

  const getTabStyle = (tabId) =>
    clsx(
      "flex-1 py-2 text-center border-b-2 cursor-pointer lg:flex gap-2 lg:border lg:justify-center lg:items-center lg:rounded lg:flex-none lg:px-3",
      {
        "border-primary-800 text-primary-800 lg:bg-primary-50":
          activeTab === tabId,
        "border-transparent text-base-700 lg:border-base-500":
          activeTab !== tabId,
      },
    );

  return (
    <>
      <h1 className="common-title mb-6 hidden !text-[22px] lg:block">
        {activeTab === "wasteDay" ? "지역별 쓰레기 정보" : "음식물 쓰레기 정보"}
      </h1>
      <ul className="flex lg:gap-2">
        {TAB_ITEMS.map(({ id, label }) => (
          <li
            key={id}
            onClick={() => setActiveTab(id)}
            className={getTabStyle(id)}
          >
            <span className="hidden lg:inline-block">
              {id === "wasteDay" ? <DayIcon /> : <FoodIcon />}
            </span>
            {label}
          </li>
        ))}
      </ul>
      <div className="mt-16">
        <TrashLayoutBox isWasteDay={activeTab === "wasteDay"} />
      </div>
    </>
  );
};

export default TrashContainer;
