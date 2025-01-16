import ArrowLeftIcon from "@/assets/images/common/arrow-left-icon.svg";
import type { PaginationProps } from "@/types/pagination.types";

const Pagination = ({
  currentPage,
  totalPages,
  startButtonIndex,
  maxButtonsToShow,
  onNextPage,
  onPrevPage,
  onGoToPage,
}: PaginationProps) => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="rounded px-4 py-2 text-base-500"
      >
        <ArrowLeftIcon />
      </button>

      {Array.from({
        length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
      }).map((_, index) => (
        <button
          key={startButtonIndex + index}
          onClick={() => onGoToPage(startButtonIndex + index + 1)}
          className={`mx-1 rounded px-3 py-2 ${
            currentPage === startButtonIndex + index + 1
              ? "text-primary-500"
              : "text-base-800"
          }`}
        >
          {startButtonIndex + index + 1}
        </button>
      ))}

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="rounded px-4 py-2 text-base-500"
      >
        <ArrowLeftIcon className="rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
