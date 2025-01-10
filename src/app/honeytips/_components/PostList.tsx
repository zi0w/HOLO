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
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  const router = useRouter();

  // 마운트 시 전체 포스트 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // 로딩 시작
      const data = await fetchPostsData();
      setPosts(data);
      setFilteredPosts(data);

      // 댓글 및 좋아요 개수를 병렬로 불러오기
      const [commentCounts, likeCounts] = await Promise.all([
        Promise.all(data.map((post) => countComments(post.id))),
        Promise.all(data.map((post) => countLikes(post.id))),
      ]);

      // 각 포스트의 댓글과 좋아요 개수를 매핑
      const commentCountMap: { [postId: string]: number } = data.reduce(
        (acc, post, idx) => {
          acc[post.id] = commentCounts[idx];
          return acc;
        },
        {} as { [postId: string]: number },
      );

      const likeCountMap: { [postId: string]: number } = data.reduce(
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

  // 글 작성하기 버튼 클릭 시 로그인 상태 확인
  const handleGoToPost = () => {
    if (isAuthenticated) {
      router.push("/honeytips/post");
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div className="container mx-auto p-4">
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
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleGoToPost}
          className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          글 작성하기
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">로딩중...</p>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
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
      </div>
    </div>
  );
};

export default PostList;
