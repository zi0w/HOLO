import SearchIcon from "@/assets/images/trash/search-icon.svg";

type SearchFormProps = {
  handleSubmit: (e: React.FormEvent<Element>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  placeholder: string;
};

const SearchForm = ({
  handleSubmit,
  handleChange,
  isDisabled,
  placeholder,
}: SearchFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="common-form focus-within:border-primary-400"
    >
      <button type="submit" disabled={isDisabled}>
        <SearchIcon />
      </button>
      <input
        type="text"
        name="prog"
        id="prog"
        className="w-full border-none text-base-800 focus:bg-transparent focus:outline-none placeholder:text-base-600"
        onChange={handleChange}
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchForm;
