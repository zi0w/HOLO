type SortButtonProps = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<"popular" | "recent">>;
};

const SortButton = ({ sortBy, setSortBy }: SortButtonProps) => {
  const handleSort = (option: "popular" | "recent") => {
    setSortBy(option);
  };

  return (
    <div className="my-4 flex gap-2 lg:my-6">
      <button
        id="sort-recent-button"
        type="button"
        aria-label="최신순 정렬"
        className={`rounded-lg border px-3 py-1 ${
          sortBy === "recent"
            ? "bg-primary-900 text-white"
            : "border-primary-900 text-primary-900"
        }`}
        onClick={() => handleSort("recent")}
      >
        최신순
      </button>

      <button
        id="sort-popular-button"
        type="button"
        aria-label="인기순 정렬"
        className={`rounded-lg border px-3 py-1 ${
          sortBy === "popular"
            ? "bg-primary-900 text-white"
            : "border-primary-900 text-primary-900"
        }`}
        onClick={() => handleSort("popular")}
      >
        인기순
      </button>
    </div>
  );
};

export default SortButton;
