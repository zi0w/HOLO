// src/app/mypage/[id]/_components/Mypost/MyWritingList.tsx
"use client";

import { useMyPosts } from "./_hooks/useMyPosts";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/app/mypage/_types/mypage";
import MyWritingCard from "@/app/mypage/[id]/_components/Mypost/MyWritingCard";

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
        <div className="flex h-full flex-col relative">
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
          <div className="absolute bottom-0 left-0 right-0 px-[86px] py-4 pr-[90px] bg-white">
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

