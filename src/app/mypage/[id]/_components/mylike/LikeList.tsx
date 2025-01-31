"use client";

import { UseLikes } from "@/app/mypage/[id]/_components/mylike/_hooks/useMyLikes";
import MyLikeCard from "@/app/mypage/[id]/_components/mylike/LikeCard";
import type { Post } from "@/app/mypage/_types/myPage";
import LoadingSmall from "@/components/common/LoadingSmall";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";

const MyLikeList = () => {
  const queryClient = useQueryClient();

  const { likedPosts, isPending, handleLikeChange } = UseLikes();

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

  const handleLikeChangeWithRefresh = async (
    postId: string,
    action: "add" | "delete",
  ) => {
    await handleLikeChange(postId, action);

    queryClient.invalidateQueries({ queryKey: ["likedPosts"] });
  };

  if (isPending)
    return (
      <div>
        <LoadingSmall />
      </div>
    );

  return (
    <div className="mt-[30px] h-[442px] w-[362px] w-full flex-shrink-0 rounded-[4px] border border-base-300 bg-white pt-[10px] md:mx-auto md:mt-[15px] md:flex md:h-[442px] md:w-[549px] md:items-center">
      {currentPosts.length > 0 ? (
        <div className="relative flex h-full flex-col lg:w-full">
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
        <p className="py-4 text-center text-base-800 md:mx-auto md:w-[549px] md:text-center">
          좋아요한 게시물이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyLikeList;
