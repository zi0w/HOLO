import { useEffect, type MutableRefObject } from "react";

const usePlaceListScrollTo = (
  category: string,
  ref: MutableRefObject<HTMLDivElement | null>,
) => {
  // 카테고리가 변경되었을 때, 스크롤을 최상단으로 초기화
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [category]);
};

export default usePlaceListScrollTo;
