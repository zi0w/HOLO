"use client";

import PostCard from "@/app/honeytips/_components/PostCard";
import { POST_CATEGORIES } from "@/app/honeytips/_constans/post";
import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import PlusButton from "@/assets/images/honeytips/plus-circle.svg";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostList = () => {
  const isAuthenticated = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

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

  useEffect(() => {
    const filtered =
      selectedCategory === "전체"
        ? posts
        : posts.filter((post) => post.categories === selectedCategory);
    setFilteredPosts(filtered);
  }, [selectedCategory, posts]);

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
    <section className="mx-auto">
      <div className="mb-4 flex justify-between border-b border-primary-100">
        {POST_CATEGORIES.map((category) => (
          <button
            key={category}
            className={clsx(
              "relative px-4 py-3 font-semibold text-base-500 transition-colors",
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

      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={handleGoToPost}
          className="relative flex items-center justify-center rounded-full"
        >
          <PlusButton />
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <p className="col-span-full text-center text-base-500">로딩중...</p>
        ) : currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <Link href={`/honeytips/${post.id}`} key={post.id}>
              <PostCard
                post={post}
                likesCount={post.likes[0].count}
                commentsCount={post.comments[0].count}
              />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            해당 카테고리에 대한 포스트가 없습니다.
          </p>
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startButtonIndex={startButtonIndex}
        maxButtonsToShow={maxButtonsToShow}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onGoToPage={goToPage}
      />
    </section>
  );
};

export default PostList;
