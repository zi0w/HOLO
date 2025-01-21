"use client";

import { useComments } from "@/app/mypage/[id]/_components/my-comment/hooks/useComments";
import MyCommentCard from "@/app/mypage/[id]/_components/my-comment/MyCommentCard";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
// import Image from "next/image";
// import Link from "next/link";

const MyCommentList = () => {
  const { comments, isLoading, handleDelete } = useComments();

  const {
    currentItems: currentComments,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(comments, 5);

  if (isLoading) return <p>로딩중입니다...</p>;

  return (
    <div className="h-full w-full pt-[10px]">
      {currentComments.length > 0 ? (
        <div className="relative flex h-full flex-col">
          <div className="flex-1">
            {currentComments.map((comment) => (
              <MyCommentCard
                key={comment.id}
                comment={comment}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white px-[86px] py-4 pr-[90px]">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startButtonIndex={startButtonIndex}
              maxButtonsToShow={maxButtonsToShow}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              onGoToPage={goToPage}
            />
          </div>
        </div>
      ) : (
        <p className="py-4 text-center text-[#8F8F8F]">
          작성한 댓글이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyCommentList;
