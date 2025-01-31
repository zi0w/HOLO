import SearchIcon from "@/assets/images/trash/search-icon.svg";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type SearchFormProps = {
  region: string;
  isMyLocation: boolean;
  handleSubmit: (e: React.FormEvent<Element>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  placeholder: string;
};

const SearchForm = ({
  region,
  isMyLocation,
  handleSubmit,
  handleChange,
  isDisabled,
  placeholder,
}: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="common-form focus-within:border-primary-400"
      >
        <button type="submit" disabled={isDisabled}>
          <SearchIcon />
        </button>
        <input
          ref={inputRef}
          type="text"
          name="prog"
          id="prog"
          value={region}
          disabled={isMyLocation}
          className="w-full border-none text-base-800 placeholder:text-xs placeholder:text-base-600 focus:bg-transparent focus:outline-none lg:placeholder:text-base"
          onChange={handleChange}
          placeholder={placeholder}
        />
      </form>
      <button
        type="submit"
        disabled={isDisabled}
        onClick={handleSubmit}
        className={clsx(
          "mt-4 w-full rounded-[4px] py-2 font-gmarket text-white",
          {
            "bg-base-400": isDisabled,
            "bg-primary-500": !isDisabled,
          },
        )}
      >
        조회
      </button>
    </>
  );
};

export default SearchForm;
