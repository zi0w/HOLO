"use client";

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
import { useEffect, useState } from "react";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [likesCount, setLikesCount] = useState<{
    [postId: Post["id"]]: number;
  }>({});
  const [commentsCount, setCommentsCount] = useState<{
    [postId: Post["id"]]: number;
  }>({});

  // 마운트 시 전체 포스트 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetchPostsData();
      setPosts(data);
      setFilteredPosts(data);

      // 각 포스트의 댓글 및 좋아요 개수 가져오기
      const commentCounts: { [postId: string]: number } = {};
      const likeCounts: { [postId: string]: number } = {};

      for (const post of data) {
        commentCounts[post.id] = await countComments(post.id);
        likeCounts[post.id] = await countLikes(post.id);
      }

      setCommentsCount(commentCounts);
      setLikesCount(likeCounts);
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

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-center space-x-4">
        {["청소", "요리", "문화", "기타"].map((category) => (
          <button
            key={category}
            className={clsx(
              "rounded-full px-6 py-2 text-sm font-semibold transition-colors",
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
        <Link
          href="/honeytips/post"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          글 작성하기
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id}>
              <div className="mb-2 flex items-center justify-between px-1">
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
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
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
                    className="aspect-square bg-gray-500 object-cover"
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
