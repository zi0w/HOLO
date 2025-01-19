// components/MyWritingCard.tsx
"use client";

import type { Post } from "@/app/mypage/_types/mypage";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


dayjs.extend(relativeTime);

export type MyWritingCardProps = {
  post: Post;
  onDelete: (postId: string) => Promise<void>;
  isDeleting: boolean;
}

const MyWritingCard: React.FC<MyWritingCardProps> = ({ post, onDelete, isDeleting }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleDelete = async () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      try {
        await onDelete(post.id);
      } catch (error) {
        console.error("게시물 삭제 실패:", error);
      }
    }
  };

  if (isDeleting) return null;

  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <div className="flex items-start">
        {post.post_image_url && post.post_image_url.length > 0 && (
          <Image
            src={post.post_image_url[0]}
            alt={`게시글 이미지`}
            width={120}
            height={120}
            className="mr-4 rounded-lg object-cover"
          />
        )}
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <Link href={`/honeytips/${post.id}`}>
              <h3 className="font-bold text-blue-600 hover:underline">
                {post.title}
              </h3>
            </Link>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
              disabled={isDeleting}
            >
              삭제
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {dayjs(post.created_at).format("YYYY.MM.DD")}
          </p>
          <p className={`mt-2 ${isContentVisible ? "" : "line-clamp-2"}`}>
            {post.content}
          </p>
        </div>
      </div>
      <button onClick={toggleContentVisibility} className="mt-2 text-blue-500">
        {isContentVisible ? "숨기기" : "더보기"}
      </button>
    </div>
  );
};

export default MyWritingCard;