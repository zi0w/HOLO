"use client";

import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostCard from "@/app/honeytips/_components/PostCard";

const BestPostList = () => {
  const [bestPosts, setBestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const posts = await fetchPostsData();
        const sortedPosts = posts
          .sort(
            (a, b) => (b.likes?.[0]?.count || 0) - (a.likes?.[0]?.count || 0),
          )
          .slice(0, 3);
        setBestPosts(sortedPosts);
      } catch (err) {
        console.error("베스트 게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestPosts();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="relative mx-5 my-5">
      <h2 className="font-bold text-xl text-base-800 mb-2">꿀팁 게시판</h2>
      <ul className="flex flex-col gap-3">
        {bestPosts.map((post) => (
          <li key={post.id}>
            <PostCard
              post={post}
              likesCount={post.likes?.[0]?.count || 0}
              commentsCount={post.comments?.[0]?.count || 0}
            />
          </li>
        ))}
      </ul>
      <Link
        href="/honeytips"
        className="flex justify-center mt-2 p-2 text-primary-500 text-lg"
      >
        더 많은 글들 보러가기
      </Link>
    </div>
  );
};

export default BestPostList;
