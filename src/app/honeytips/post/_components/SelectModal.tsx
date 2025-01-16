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
  const [buttonRef, setButtonRef] = useState<HTMLElement | null>(null);

  const handleSelectCategory = (category: string) => {
    onChange(category);
    setIsModalOpen(false);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        ref={setButtonRef}
        onClick={handleButtonClick}
        className="flex items-center gap-1 rounded-md px-2 py-1 font-bold text-base-800"
      >
        {selectedCategory}
        <ChevronDown />
      </button>

      {/* 모달 */}
      {isModalOpen && buttonRef && (
        <div
          className="fixed z-10 py-1 flex items-center justify-center rounded-lg border shadow-md"
          style={{
            top: `${buttonRef.getBoundingClientRect().bottom + window.scrollY}px`,
            left: `${buttonRef.getBoundingClientRect().left}px`,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-[calc(100%+16px)] rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              {FORM_CATEGORIES.map((category) => (
                <li
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  className="cursor-pointer px-5 py-2 text-base-700 hover:bg-primary-100 hover:text-primary-500"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelectModal;
