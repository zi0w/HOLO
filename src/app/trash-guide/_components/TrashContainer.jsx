"use client";

import TrashLayoutBox from "@/app/trash-guide/_components/TrashLayoutBox";
import { TAB_ITEMS } from "@/app/trash-guide/_constants/tab";
import clsx from "clsx";
import { useState } from "react";

const TrashContainer = () => {
  const [activeTab, setActiveTab] = useState("wasteDay");

  const getTabStyle = (tabId) =>
    clsx("flex-1 py-2 text-center border-b-2 cursor-pointer", {
      "border-primary-800 text-primary-800": activeTab === tabId,
      "border-transparent text-base-600": activeTab !== tabId,
    });

  return (
    <div>
      <ul className="flex">
        {TAB_ITEMS.map(({ id, label }) => (
          <li
            key={id}
            onClick={() => setActiveTab(id)}
            className={getTabStyle(id)}
          >
            {label}
          </li>
        ))}
      </ul>
      <div className="mt-16">
        <TrashLayoutBox isWasteDay={activeTab === "wasteDay"} />
      </div>
    </div>
  );
};

export default TrashContainer;
