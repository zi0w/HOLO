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
    <div className="mx-5 mt-8 h-[440px] w-[100%-40px] flex-shrink-0 rounded border border-base-300 bg-white pt-2.5 lg:mx-auto lg:mt-4 lg:flex lg:h-[440px] lg:w-[548px] lg:items-center">
      {currentPosts.length > 0 ? (
        <div className="relative flex h-full w-full flex-col">
         
          <div className="flex-1">
            {currentPosts.map((post) => (
              <MyLikeCard
                key={post.id}
                post={post}
                onLikeChange={handleLikeChangeWithRefresh}
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
          좋아요한 게시물이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyLikeList;
