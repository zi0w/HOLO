"use client";

import { useMyPosts } from "@/app/mypage/[id]/_components/mypost/_hooks/useMyWriting";
import MyWritingCard from "@/app/mypage/[id]/_components/mypost/WritingCard";
import type { Post } from "@/app/mypage/_types/myPage";
import LoadingSmall from "@/components/common/LoadingSmall";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";

const MyWritingList = () => {
  const queryClient = useQueryClient();
  const { posts, isLoading, handleDelete, isDeleting } = useMyPosts();

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination<Post>(posts, 5);

  // 게시글 삭제 핸들러
  const handleDeleteWithRefresh = async (postId: string) => {
    await handleDelete(postId);
    // 데이터 갱신
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  if (isLoading)
    return (
      <div>
        <LoadingSmall />
      </div>
    );

    return (
      <div className="mt-8 h-[440px] w-full flex-shrink-0 rounded border border-base-300 bg-white pt-2.5 md:mx-auto md:mt-4 md:flex md:h-[440px] md:w-[548px] md:items-center">
        {currentPosts.length > 0 ? (
          <div className="relative flex h-full flex-col w-full">
            <div className="flex-1">
              {currentPosts.map((post) => (
                <MyWritingCard
                  key={post.id}
                  post={post}
                  onDelete={handleDeleteWithRefresh}
                  isDeleting={isDeleting(post.id)}
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white px-[84px] py-4 pr-[88px]">
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
            작성한 게시물이 없습니다.
          </p>
        )}
      </div>
    );
    
};

export default MyWritingList;






