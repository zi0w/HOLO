"use client";

import { useMyPosts } from "@/app/mypage/[id]/_components/mypost/_hooks/useMyWriting";
import MyWritingCard from "@/app/mypage/[id]/_components/mypost/myWritingCard";
import type { Post } from "@/app/mypage/_types/myPage";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

const MyWritingList = () => {
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

  if (isLoading) return <p>로딩중입니다...</p>;

  return (
    <div className="h-full w-full pt-[10px]">
      {currentPosts.length > 0 ? (
        <div className="relative flex h-full flex-col">
          <div className="flex-1">
            {currentPosts.map((post) => (
              <MyWritingCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                isDeleting={isDeleting(post.id)}
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
          작성한 게시물이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyWritingList;
