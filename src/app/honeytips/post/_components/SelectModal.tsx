"use client";

import { FORM_CATEGORIES } from "@/app/honeytips/_constans/post";
import ChevronDown from "@/assets/images/honeytips/chevron-down.svg";
import { useState } from "react";

type CategorySelectModalProps = {
  selectedCategory: string;
  onChange: (category: string) => void;
};

const CategorySelectModal = ({
  selectedCategory,
  onChange,
}: CategorySelectModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectCategory = (category: string) => {
    onChange(category);
    setIsModalOpen(false);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className="flex w-[68px] items-center justify-between rounded-md px-2 py-1 font-bold text-base-800"
      >
        {selectedCategory}
        <ChevronDown />
      </button>

      {isModalOpen && (
        <div
          className="absolute z-10 mt-1 w-[68px] rounded-lg border bg-white py-1 shadow-md"
          onClick={() => setIsModalOpen(false)}
        >
          <ul className="flex flex-col items-center">
            {FORM_CATEGORIES.map((category) => (
              <li
                key={category}
                onClick={() => handleSelectCategory(category)}
                className="cursor-pointer px-4 py-2 text-base-700 hover:bg-primary-50 hover:text-primary-900"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategorySelectModal;
