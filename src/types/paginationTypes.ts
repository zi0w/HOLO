export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  startButtonIndex: number;
  maxButtonsToShow: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
}
