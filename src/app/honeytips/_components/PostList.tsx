"use client";

import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("ko"); // 한국 시간 설정

const PostList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // 마운트 시 전체 포스트 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetchPostsData();
      setPosts(data);
      setFilteredPosts(data);
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
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-300"
            }`}
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
            <Link href={`/honeytips/${post.id}`} key={post.id}>
              <li className="relative flex items-center justify-between gap-2 rounded-lg bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl">
                <div className="flex w-full flex-col">
                  <div className="flex items-center gap-3">
                    <Image
                      className="h-12 w-12 rounded-full border-2"
                      src={
                        post.users?.profile_image_url ||
                        "https://via.placeholder.com/100x100"
                      }
                      alt="프로필 이미지"
                      width={100}
                      height={100}
                    />
                    <p className="font-medium">{post.users?.nickname}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                  <h3 className="mb-2 mt-2 text-xl font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {post.content}
                  </p>
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
                />
              </li>
            </Link>
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
