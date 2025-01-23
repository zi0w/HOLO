import type { CustomSelectProps } from "@/app/policy/_types/option";
import { useEffect, useRef, useState } from "react";

const CustomSelect = ({
  options,
  selectedValue,
  onChange,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    setIsInitial(false);
  };

  const selectedOption = options.find(
    (option) => option.code === selectedValue,
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="common-select-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.name || options[0]?.name}
      </button>
      {isOpen && (
        <div className="common-select">
          <ul>
            {options.map((option, index) => (
              <li
                key={option.id}
                className={
                  (isInitial && index === 0) ||
                  (!isInitial && option.code === selectedValue)
                    ? "active object-cover"
                    : ""
                }
                onClick={() => handleSelect(option.code)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
