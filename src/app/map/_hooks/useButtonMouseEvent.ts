import { useRef } from "react";

const useButtonMouseEvent = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging = true;
    startX = e.pageX - scrollRef.current.offsetLeft; // 현재 마우스 X 좌표
    scrollLeft = scrollRef.current.scrollLeft; // 현재 스크롤 위치 저장
  };

  // 마우스를 움직일 때 스크롤 이동
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft; // 현재 마우스 위치
    const walk = (x - startX) * 0.8; // 빠르게 조정
    scrollRef.current.scrollLeft = scrollLeft - walk; // 스크롤 위치 이동
  };

  // 마우스를 놓았을 때 드래그 종료
  const handleMouseUp = () => {
    isDragging = false;
  };

  return { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp };
};

export default useButtonMouseEvent;
