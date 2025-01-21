type SortButtonProps = {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<"popular" | "recent">>;
};

const SortButton = ({ sortBy, setSortBy }: SortButtonProps) => {
  const handleSort = (option: "popular" | "recent") => {
    setSortBy(option);
  };

  return (
    <div className="mb-4 flex gap-2">
      <button
        className={`rounded-lg border px-3 py-1 ${
          sortBy === "recent"
            ? "bg-primary-900 text-white" // 최신순이 선택된 경우
            : "border-primary-900 text-primary-900"
        }`}
        onClick={() => handleSort("recent")}
      >
        최신순
      </button>

      <button
        className={`rounded-lg border px-3 py-1 ${
          sortBy === "popular"
            ? "bg-primary-900 text-white" // 인기순이 선택된 경우
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
