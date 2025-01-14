"use client";

import PostCard from "@/app/honeytips/_components/PostCard";
import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { countComments } from "@/app/honeytips/_utils/comment";
import { countLikes } from "@/app/honeytips/_utils/like";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import usePagination from "@/app/hooks/usePagination";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

const PostList = () => {
  const isAuthenticated = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [likesCount, setLikesCount] = useState<{
    [postId: Post["id"]]: number;
  }>({});
  const [commentsCount, setCommentsCount] = useState<{
    [postId: Post["id"]]: number;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  // 마운트 시 전체 포스트 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // 로딩 시작
      const postsData = await fetchPostsData();
      setPosts(postsData);
      setFilteredPosts(postsData);

      // 댓글 및 좋아요 개수를 병렬로 불러오기
      const [commentCounts, likeCounts] = await Promise.all([
        Promise.all(postsData.map((post) => countComments(post.id))),
        Promise.all(postsData.map((post) => countLikes(post.id))),
      ]);

      // 각 포스트의 댓글과 좋아요 개수를 매핑
      const commentCountMap: { [postId: string]: number } = postsData.reduce(
        (acc, post, idx) => {
          acc[post.id] = commentCounts[idx];
          return acc;
        },
        {} as { [postId: string]: number },
      );

      const likeCountMap: { [postId: string]: number } = postsData.reduce(
        (acc, post, idx) => {
          acc[post.id] = likeCounts[idx];
          return acc;
        },
        {} as { [postId: string]: number },
      );

      setCommentsCount(commentCountMap);
      setLikesCount(likeCountMap);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  // 카테고리 변경 시 해당 카테고리에 맞는 포스트 불러오기
  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) => post.categories === selectedCategory,
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  // 글 작성하기 버튼 클릭 시 로그인 상태 확인 및 선택된 카테고리 정보 보냄
  const handleGoToPost = () => {
    if (isAuthenticated) {
      router.push(`/honeytips/post?category=${selectedCategory}`);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  // 페이지네이션
  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(filteredPosts, 20);

  return (
    <section className="container mx-auto">
      <div className="mb-6 flex justify-between border-b border-primary-100">
        {["청소", "요리", "문화", "기타"].map((category) => (
          <button
            key={category}
            className={clsx(
              "relative px-7 py-2 text-lg font-semibold text-base-500 transition-colors",
              selectedCategory === category
                ? "text-base-800"
                : "hover:text-base-800",
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
            {selectedCategory === category && (
              <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-primary-500"></span>
            )}
          </button>
        ))}
      </div>

      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={handleGoToPost}
          className="relative flex items-center justify-center rounded-full border-primary-500 bg-primary-50 text-5xl text-primary-500"
        >
          <BsPlusCircle />
        </button>
      </div>

      <section className="grid grid-cols-1 gap-5">
        {isLoading ? (
          <p className="col-span-full text-center text-base-500">로딩중...</p>
        ) : currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              likesCount={likesCount}
              commentsCount={commentsCount}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            해당 카테고리에 대한 포스트가 없습니다.
          </p>
        )}
      </section>

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
            className={`mx-1 rounded px-3 py-2 ${
              currentPage === startButtonIndex + index + 1
                ? "font-bold text-base-800"
                : "text-base-500"
            }`}
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
