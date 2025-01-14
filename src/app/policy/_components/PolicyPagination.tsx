type PolicyPaginationProps = {
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  startButtonIndex: number;
  maxButtonsToShow: number;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
};

const PolicyPagination = ({
  isLoading,
  currentPage,
  totalPages,
  startButtonIndex,
  maxButtonsToShow,
  prevPage,
  nextPage,
  goToPage,
}: PolicyPaginationProps) => {
  if (isLoading) {
    return null; 
  }

  return (
    <div className="mt-4 flex items-center justify-center">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="rounded px-4 py-2 text-base-500"
      >
        &lt;
      </button>

      {Array.from({
        length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
      }).map((_, index) => (
        <button
          key={startButtonIndex + index}
          onClick={() => goToPage(startButtonIndex + index + 1)}
          className={`mx-1 rounded px-3 py-2 ${
            currentPage === startButtonIndex + index + 1
              ? "font-bold text-base-800"
              : "text-base-500"
          }`}
        >
          {startButtonIndex + index + 1}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="rounded px-4 py-2 text-base-500"
      >
        &gt;
      </button>
    </div>
  );
};

export default PolicyPagination;
