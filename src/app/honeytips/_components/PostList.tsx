"use client";

import PostCard from "@/app/honeytips/_components/PostCard";
import { POST_CATEGORIES } from "@/app/honeytips/_constans/post";
import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import usePagination from "@/hooks/usePagination";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TempButton from "@/assets/images/honeytips/love_selected_42.svg"
import Image from "next/image";

const PostList = () => {
  const isAuthenticated = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  // 페이지네이션
  const {
    currentItems: currentPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(filteredPosts, 20);

  // 마운트 시 전체 포스트 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const postsData = await fetchPostsData();
      setPosts(postsData);
      setFilteredPosts(postsData);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  // 카테고리 변경 시, 해당 카테고리에 맞는 포스트 불러오기
  useEffect(() => {
    const filtered =
      selectedCategory === "전체"
        ? posts
        : posts.filter((post) => post.categories === selectedCategory);
    setFilteredPosts(filtered);
  }, [selectedCategory, posts]);

  // 글 작성하기 버튼 클릭 시, 로그인 상태 확인 및 선택된 카테고리 정보 보냄
  const handleGoToPost = () => {
    if (isAuthenticated) {
      router.push(`/honeytips/post?category=${selectedCategory}`);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const handleClickCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="container mx-auto">
      {/* 카테고리 별 렌더링 */}
      <div className="mb-6 flex justify-between border-b border-primary-100">
        {POST_CATEGORIES.map((category) => (
          <button
            key={category}
            className={clsx(
              "relative px-5 py-2 text-lg font-semibold text-base-500 transition-colors",
              selectedCategory === category
                ? "text-base-800"
                : "hover:text-base-800",
            )}
            onClick={() => handleClickCategory(category)}
          >
            {category}
            {selectedCategory === category && (
              <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-primary-500"></span>
            )}
          </button>
        ))}
      </div>

      {/* 글 작성 버튼 */}
      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={handleGoToPost}
          className="relative flex items-center justify-center rounded-full bg-white"
        >
          <TempButton />
        </button>
      </div>

      {/* 포스트 리스트 */}
      <section className="grid grid-cols-1 gap-5">
        {isLoading ? (
          <p className="col-span-full text-center text-base-500">로딩중...</p>
        ) : currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              likesCount={post.likes[0].count}
              commentsCount={post.comments[0].count}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            해당 카테고리에 대한 포스트가 없습니다.
          </p>
        )}
      </section>

      {/* 페이지네이션 */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="rounded px-4 py-2 text-base-500"
        >
          &lt;
        </button>

        {Array.from({
          length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
        }).map((_, index) => (
          <button
            key={startButtonIndex + index}
            onClick={() => goToPage(startButtonIndex + index + 1)}
            className={`mx-1 rounded px-3 py-2 ${currentPage === startButtonIndex + index + 1 ? "font-bold text-base-800" : "text-base-500"}`}
          >
            {startButtonIndex + index + 1}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="rounded px-4 py-2 text-base-500"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default PostList;
