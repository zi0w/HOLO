// src/app/mypage/[id]/_components/Mypost/MyWritingList.tsx
"use client";

import { useMyPosts } from "./_hooks/useMyPosts";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/app/mypage/_types/mypage";

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
    <div className="container mx-auto px-4">
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <div 
            key={post.id}
            className="flex h-[64px] w-full items-center justify-between border-b border-[#E6E6E6] px-5"
          >
            <Link 
              href={`/honeytips/${post.id}`}
              className="flex items-center gap-3 flex-1"
            >
              {post.post_image_url && post.post_image_url.length > 0 && (
                <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-[4px]">
                  <Image
                    src={post.post_image_url[0]}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] font-bold line-clamp-1">
                    {post.title}
                  </h3>
                  <span className="text-[12px] text-[#8F8F8F]">
                    {post.categories}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[12px] text-[#8F8F8F] line-clamp-1">
                    {post.content}
                  </p>
                  {post.users && (
                    <span className="text-[12px] text-[#8F8F8F]">
                      {post.users.nickname}
                    </span>
                  )}
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[#8F8F8F]">
                {new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }).replace(/\. /g, '.').slice(0, -1)}
              </span>
              <button
                onClick={() => handleDelete(post.id)}
                disabled={isDeleting(post.id)}
                className={`text-[#8F8F8F] hover:text-[#FF7600] transition-colors
                  ${isDeleting(post.id) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Image
                  src="/icons/trash.svg"
                  alt="삭제"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-[#8F8F8F] py-4">작성한 게시물이 없습니다.</p>
      )}

      {currentPosts.length > 0 && (
        <div className="mt-4">
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
      )}
    </div>
  );
};

export default MyWritingList;

