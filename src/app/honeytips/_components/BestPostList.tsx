"use client";

import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchBestPostsData } from "@/app/honeytips/_utils/post";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { useEffect, useState } from "react";
import SmallComment from "@/assets/images/honeytips/Frame 40.svg";
import SmallHeart from "@/assets/images/honeytips/heart.svg";
import SmallDot from "@/assets/images/honeytips/small dot.svg";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const BestPostList = () => {
  const [bestPosts, setBestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestPosts = async () => {
      try {
        const posts = await fetchBestPostsData();
        setBestPosts(posts);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchBestPosts();
  }, []);

  const formatDate = (date: string) => {
    const now = dayjs();
    const createdAt = dayjs(date);
    if (now.diff(createdAt, "hour") < 24) {
      return createdAt.fromNow();
    }
    return createdAt.format("YY.MM.DD");
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <ul>
        {bestPosts.map((post) => (
          <li key={post.id}>
            <article>
              <section className="relative flex flex-col gap-4 rounded-lg border border-base-300 bg-white p-5">
                <div className="flex w-full items-start gap-4">
                  <div className="flex w-full flex-col">
                    <h3 className="mb-2 font-bold text-black">{post.title}</h3>
                    <p className="line-clamp-3 text-gray-900">{post.content}</p>
                  </div>
                  {post.post_image_url?.[0] && (
                    <Image
                      className="aspect-square rounded bg-white object-cover"
                      src={post.post_image_url[0]}
                      alt="게시글 이미지"
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {post.users?.profile_image_url && (
                        <Image
                          className="h-6 w-6 rounded-full border-2 bg-white"
                          src={post.users.profile_image_url}
                          alt="프로필 이미지"
                          width={100}
                          height={100}
                        />
                      )}
                      <p className="mx-1 text-sm text-base-600">
                        {post.users?.nickname}
                      </p>
                      <SmallDot />
                      <time className="ml-1 text-sm text-base-600">
                        {formatDate(post.created_at)}
                      </time>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-base-600">
                    <div className="flex items-center gap-1">
                      <SmallHeart />
                      <span className="text-xs">
                        {post.likes?.[0]?.count || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SmallComment />
                      <span className="text-xs">
                        {post.comments?.[0]?.count || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestPostList;
