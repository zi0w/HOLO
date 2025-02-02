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

  // 댓글 삭제 핸들러
  const handleDeleteWithRefresh = async (commentId: string) => {
    await handleDelete(commentId);
    // 데이터 갱신
    queryClient.invalidateQueries({ queryKey: ["comments"] });
  };

  if (isLoading)
    return (
      <div>
        <LoadingSmall />
      </div>
    );

    return (
      <div className="mt-8 h-[440px] w-full flex-shrink-0 rounded border border-base-300 bg-white pt-2.5 md:mx-auto md:mt-4 md:flex md:h-[440px] md:w-[548px] md:items-center">
        {currentComments.length > 0 ? (
          <div className="relative flex h-full flex-col w-full">
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
          <p className="py-4 text-center text-base-800 md:mx-auto md:w-[548px] md:text-center">
            작성한 댓글이 없습니다.
          </p>
        )}
      </div>
    );
    
};

export default MyCommentList;
