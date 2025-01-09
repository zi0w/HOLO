"use client";

import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { countComments } from "@/app/honeytips/_utils/comment";
import { countLikes } from "@/app/honeytips/_utils/like";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";

dayjs.extend(relativeTime);
dayjs.locale("ko");

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

  const router = useRouter();

  // 마운트 시 전체 포스트 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
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

  const formatDate = (date: string) => {
    const now = dayjs();
    const createdAt = dayjs(date);

    if (now.diff(createdAt, "hour") < 24) {
      return createdAt.fromNow();
    }
    return createdAt.format("YY.MM.DD");
  };

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
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id}>
              <div className="mb-1 flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <Image
                    className="h-10 w-10 rounded-full border-2"
                    src={
                      post.users?.profile_image_url ||
                      "https://via.placeholder.com/100x100"
                    }
                    alt="프로필 이미지"
                    width={100}
                    height={100}
                  />
                  <p className="font-medium">{post.users?.nickname}</p>
                </div>
                <p className="text-xs text-gray-500">
                  {formatDate(post.created_at)}
                </p>
              </div>

              <Link href={`/honeytips/${post.id}`}>
                <li
                  className={clsx(
                    "relative mb-4 flex items-center justify-between gap-2 rounded-lg bg-white p-6 shadow-lg transition-all",
                    "hover:scale-105 hover:shadow-2xl",
                  )}
                >
                  <div className="flex w-full flex-col">
                    <h3 className="mb-2 font-bold text-gray-800">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {post.content}
                    </p>
                    <div className="mt-4 flex items-center gap-1">
                      <FaRegHeart />
                      <span className="mr-2 text-xs">
                        {likesCount[post.id] || 0}
                      </span>
                      <FaRegCommentAlt />
                      <span className="text-xs">
                        {commentsCount[post.id] || 0}
                      </span>
                    </div>
                  </div>
                  <Image
                    className="aspect-square rounded bg-gray-500 object-cover"
                    src={
                      post.post_image_url?.[0] ||
                      "https://via.placeholder.com/120x120"
                    }
                    alt="게시글 이미지"
                    width={120}
                    height={120}
                    loading="lazy"
                  />
                </li>
              </Link>
            </div>
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
