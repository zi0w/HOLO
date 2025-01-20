// src/app/mypage/[id]/_components/Mycomment/MyCommentList.tsx
"use client";


import { useComments } from "@/app/mypage/[id]/_components/Mycomment/hooks/useComments";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import Image from "next/image";
import Link from "next/link";

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
    <div className="container mx-auto px-4">
      {currentComments.length > 0 ? (
        currentComments.map((comment) => (
          <div 
            key={comment.id}
            className="flex h-[64px] w-full items-center justify-between border-b border-[#E6E6E6] px-5"
          >
            <Link 
              href={`/honeytips/${comment.post_id}`}
              className="flex items-center gap-3 flex-1"
            >
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h3 className="text-[14px] font-bold line-clamp-1">
                  {comment.posts.title}
                </h3>
                <p className="text-[12px] text-[#8F8F8F] line-clamp-1">
                  {comment.comment}
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[#8F8F8F]">
                {new Date(comment.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }).replace(/\. /g, '.').slice(0, -1)}
              </span>
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-[#8F8F8F] hover:text-[#FF7600]"
              >
                <Image
                  src="/icons/trash.svg"
                  alt="삭제"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-[#8F8F8F] py-4">작성한 댓글이 없습니다.</p>
      )}

      {currentComments.length > 0 && (
        <div className="mt-4">
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
      )}
    </div>
  );
};

export default MyCommentList;







