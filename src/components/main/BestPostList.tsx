"use client";

import PostCard from "@/app/honeytips/_components/PostCard";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostsData } from "@/app/honeytips/_utils/post";
import LoadingSmall from "@/components/common/LoadingSmall";
import Link from "next/link";
import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const BestPostList = () => {
  const [bestPosts, setBestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const posts = await fetchPostsData();
        const sortedPosts = posts
          .sort((a, b) => (b.likes[0].count || 0) - (a.likes[0].count || 0))
          .slice(0, isLargeScreen ? 5 : 3);
        setBestPosts(sortedPosts);
      } catch (error) {
        console.error(
          "베스트 게시글을 불러오는 중 오류가 발생했습니다.",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBestPosts();
  }, [isLargeScreen]);

  if (loading)
    return (
      <div className="mb-4">
        <LoadingSmall />
      </div>
    );

  return (
    <div className="relative mx-5 lg:mx-auto lg:max-w-[358px] lg:mt-4">
      <h2 className="common-title !text-[22px]">꿀팁 게시판</h2>
      <ul className="mt-4 flex flex-col gap-4">
        {bestPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            likesCount={post.likes[0].count || 0}
            commentsCount={post.comments[0].count || 0}
          />
        ))}
      </ul>
      <Link
        href="/honeytips"
        className="mb-[34px] mt-[18px] flex justify-center text-sm text-primary-500 lg:text-lg"
      >
        더 많은 글들 보러가기
      </Link>
    </div>
  );
};

export default BestPostList;
