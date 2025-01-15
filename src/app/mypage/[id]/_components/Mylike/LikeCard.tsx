"use client";

import MyLikeButton from "@/app/mypage/_components/MyLikeButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image"; // Next.js의 Image 컴포넌트 가져오기
import Link from "next/link"; // Link 컴포넌트 가져오기
import { useState } from "react";

dayjs.extend(relativeTime);

type PostLikeCardProps = {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    users?: {
      nickname: string;
      profile_image_url: string | null;
    };
  };
  onLikeChange: () => void;
};

const LikeCard = ({ post, onLikeChange }: PostLikeCardProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <Link href={`/honeytips/${post.id}`} className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-blue-600 hover:underline">
            {post.title}
          </h3>
          <div className="flex items-center">
            <MyLikeButton postId={post.id} onLikeChange={onLikeChange} />
          </div>
        </div>

        <div className="mt-2 flex items-center">
          {post.users?.profile_image_url ? (
            <Image
              src={post.users.profile_image_url}
              alt={`${post.users.nickname}의 프로필 이미지`}
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
              <span className="text-gray-500">N/A</span>
            </div>
          )}
          {post.users?.nickname && (
            <span className="ml-2 text-sm">{post.users.nickname}</span>
          )}
        </div>

        <p className="text-xs text-gray-500">
          {dayjs(post.created_at).fromNow()}
        </p>

        <p className={`mt-2 ${isContentVisible ? "" : "line-clamp-2"}`}>
          {post.content}
        </p>
      </Link>

      {/* Move the button outside of the Link */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleContentVisibility();
        }}
        className="mt-2 text-blue-500"
      >
        {isContentVisible ? "숨기기" : "더보기"}
      </button>
    </div>
  );
};

export default LikeCard;
