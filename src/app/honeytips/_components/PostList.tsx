"use client";

import PostCard from "@/app/honeytips/_components/PostCard";
import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { countComments } from "@/app/honeytips/_utils/comment";
import { countLikes } from "@/app/honeytips/_utils/like";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      const filteredPosts = posts.filter(
        (post) => post.categories === selectedCategory,
      );
      setFilteredPosts(filteredPosts);
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

  return (
    <section className="container mx-auto p-4">
      <div className="mb-6 flex justify-center space-x-4">
        {["청소", "요리", "문화", "기타"].map((category) => (
          <button
            key={category}
            className={clsx(
              "rounded px-4 py-2 text-sm font-semibold transition-colors",
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-300",
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={handleGoToPost}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-500 bg-primary-50 text-primary-500"
        >
          <span className="absolute inset-0 flex items-center justify-center text-3xl">
            +
          </span>
        </button>
      </div>
      <section className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">로딩중...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
    </section>
  );
};

export default PostList;
