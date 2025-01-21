import ArrowLeftIcon from "@/assets/images/common/arrow-left-icon.svg";
import type { PaginationProps } from "@/types/paginationTypes";
import clsx from "clsx";

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
    <div className="mt-6 flex items-center justify-center gap-3">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        <ArrowLeftIcon />
      </button>

      {Array.from({
        length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
      }).map((_, index) => (
        <button
          key={startButtonIndex + index}
          onClick={() => onGoToPage(startButtonIndex + index + 1)}
          className={clsx(
            "text-sm",
            currentPage === startButtonIndex + index + 1
              ? "text-primary-500"
              : "text-base-800",
          )}
        >
          {startButtonIndex + index + 1}
        </button>
      ))}

      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        <ArrowLeftIcon className="rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
