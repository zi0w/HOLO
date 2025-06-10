"use client";

import { useComments } from "@/app/mypage/[id]/_components/my-comment/hooks/useComments";
import MyCommentCard from "@/app/mypage/[id]/_components/my-comment/MyCommentCard";
import LoadingSmall from "@/components/common/LoadingSmall";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";

const MyCommentList = () => {
  const queryClient = useQueryClient();
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

  const handleDeleteWithRefresh = async (commentId: string) => {
    await handleDelete(commentId);

    queryClient.invalidateQueries({ queryKey: ["comments"] });
  };

  return (
    <div className="mx-5 mt-8 h-[440px] w-[100%-40px] flex-shrink-0 rounded border border-base-300 bg-white pt-2.5 lg:mx-auto lg:mt-4 lg:flex lg:h-[440px] lg:w-[548px] lg:items-center">
      {currentComments.length > 0 ? (
        <div className="relative flex h-full w-full flex-col">
          <div className="flex-1">
            {currentComments.map((comment) => (
              <MyCommentCard
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteWithRefresh}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white px-20 py-4 pr-[90px]">
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
        <div className="py-4 text-center text-base-800 lg:mx-auto lg:w-[548px] lg:text-center">
          {isLoading ? <LoadingSmall /> : "작성한 댓글이 없습니다."}
        </div>
      )}
    </div>
  );
};

export default MyCommentList;
