import { useState } from "react";

export type PaginationHook<T> = {
  currentItems: T[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  startButtonIndex: number;
  maxButtonsToShow: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
};

export const usePagination = <T,>(
  items: T[],
  itemsPerPage: number,
): PaginationHook<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsArray = Array.isArray(items) ? items : [];
  const totalPages = Math.ceil(itemsArray.length / itemsPerPage);

  const currentItems = itemsArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const maxButtonsToShow = 5;
  const startButtonIndex =
    Math.floor((currentPage - 1) / maxButtonsToShow) * maxButtonsToShow;

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page: number) => setCurrentPage(page);

  return {
    currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  };
};

