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
    <div className="h-full w-full pt-[10px] mt-[30px] md:mt-[15px] md:w-[549px] w-[362px] md:h-[442px] h-[442px] rounded-[4px] border border-[#E0E0E0] bg-white flex-shrink-0 md:mx-auto md:flex md:items-center">



      {currentComments.length > 0 ? (
        <div className="relative flex h-full flex-col">
          <div className="flex-1">
            {currentComments.map((comment) => (
              <MyCommentCard
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteWithRefresh} 
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
        <p className="py-4 text-center text-base-800 md:text-center md:mx-auto md:w-[549px]">

          작성한 댓글이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyCommentList;

