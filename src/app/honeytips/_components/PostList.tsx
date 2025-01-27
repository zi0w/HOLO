"use client";

import { useToggle } from "@/app/honeytips/[id]/_hooks/useToggle";
import PostCard from "@/app/honeytips/_components/PostCard";
import PostCardLoading from "@/app/honeytips/_components/PostCardLoading";
import SortButton from "@/app/honeytips/_components/SortButton";
import { POST_CATEGORIES } from "@/app/honeytips/_constans/post";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import PlusButton from "@/assets/images/honeytips/plus-circle.svg";
import ConfirmModal from "@/components/common/ConfirmModal";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";
import useAuthStore from "@/store/authStore";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PostList = () => {
  const { isLoggedIn: isAuthenticated } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [sortBy, setSortBy] = useState<"popular" | "recent">("recent");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    isOpen: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useToggle();

  const router = useRouter();
  const searchQuery = useSearchParams();

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
      let postsData = await fetchPostsData();

      const searchTerm = searchQuery.get("query");

      if (searchTerm) {
        postsData = postsData.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      setPosts(postsData);
      setFilteredPosts(postsData);
      setIsLoading(false);
    };

    fetchPosts();
  }, [searchQuery]);

  useEffect(() => {
    const filtered =
      selectedCategory === "전체"
        ? posts
        : posts.filter((post) => post.categories === selectedCategory);

    const sorted =
      sortBy === "recent"
        ? [...filtered].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
        : [...filtered].sort(
            (a, b) => (b.likes[0]?.count || 0) - (a.likes[0]?.count || 0),
          );

    setFilteredPosts(sorted);
  }, [selectedCategory, sortBy, posts]);

  const handleGoToPost = () => {
    if (!isAuthenticated) {
      openModal();
      return;
    }
    router.push(`/honeytips/post?category=${selectedCategory}`);
  };

  const handleClickCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <section className="mx-auto mb-4">
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={() => router.push("/sign-in")}
        onCancel={() => closeModal()}
        text="로그인으로 이동"
      />
      <div className="mb-4 flex justify-between border-b border-primary-100">
        {POST_CATEGORIES.map((category) => (
          <button
            key={category}
            className={clsx(
              "relative flex-1 py-3 font-semibold text-base-500 transition-colors",
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

      <div className="fixed bottom-14 right-4 z-50">
        <button
          onClick={handleGoToPost}
          className="relative flex items-center justify-center rounded-full"
        >
          <PlusButton />
        </button>
      </div>

      <SortButton sortBy={sortBy} setSortBy={setSortBy} />

      <section className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <PostCardLoading />
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
