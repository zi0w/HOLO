"use client";

import { UseLikes } from "@/app/mypage/[id]/_components/mylike/_hooks/useMyLikes";
import MyLikeCard from "@/app/mypage/[id]/_components/mylike/LikeCard";
import LoadingSmall from "@/components/common/LoadingSmall";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import type { Post } from "@/app/mypage/_types/myPage";
import { useQueryClient } from "@tanstack/react-query";

const MyLikeList = () => {
  const queryClient = useQueryClient();
  
  const {
    likedPosts,
    isPending,
    handleLikeChange,
  } = UseLikes();

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination<Post>(likedPosts || [], 5);

  
  const handleLikeChangeWithRefresh = async (postId: string, action: "add" | "delete") => {
    await handleLikeChange(postId, action);
   
    queryClient.invalidateQueries({ queryKey: ['likedPosts'] });
  };

  if (isPending)
    return (
      <div>
        <LoadingSmall />
      </div>
    );

  return (
<div className="h-full w-full pt-[10px] mt-[30px] md:mt-[15px] md:w-[549px] w-[362px] md:h-[442px] h-[442px] rounded-[4px] border border-[#E0E0E0] bg-white flex-shrink-0 md:mx-auto md:flex md:items-center">
      {currentPosts.length > 0 ? (
        <div className="relative flex h-full flex-col">
          <div className="flex-1">
            {currentPosts.map((post) => (
              <MyLikeCard
                key={post.id}
                post={post}
                onLikeChange={handleLikeChangeWithRefresh}
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

          좋아요한 게시물이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyLikeList;



