"use client";

import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

import { UseLikes } from "@/app/mypage/[id]/_components/mylike/_hooks/useMyLikes";
import MyLikeCard from "@/app/mypage/[id]/_components/mylike/myLikeCard";
import type { Post } from "@/app/mypage/_types/myPage";

const MyLikeList = () => {
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

  if (isPending) return <p>로딩중입니다...</p>;

  return (
    <div className="h-full w-full pt-[10px]">
      {currentPosts.length > 0 ? (
        <div className="relative flex h-full flex-col">
          {" "}
          {/* relative 추가 */}
          <div className="flex-1">
            {currentPosts.map((post) => (
              <MyLikeCard
                key={post.id}
                post={post}
                onLikeChange={handleLikeChange}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white px-[86px] py-4 pr-[90px]">
            {" "}
            {/* absolute, bottom-0, left-0, right-0, bg-white 추가 */}
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
          좋아요한 게시물이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyLikeList;
