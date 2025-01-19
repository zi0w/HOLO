// components/MyCommentCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FC } from "react";
import type { CommentWithPost } from "@/app/mypage/[id]/_components/_type/comment";

type MyCommentCardProps = {
  comment: CommentWithPost;
  onDelete: (commentId: string) => void;
};

const MyCommentCard: FC<MyCommentCardProps> = ({ comment, onDelete }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <Link
        href={`/honeytips/${comment.post_id}`}
        className="flex h-full flex-col"
      >
        <div className="flex items-start">
          {comment.posts.post_image_url &&
            comment.posts.post_image_url.length > 0 && (
              <Image
                src={comment.posts.post_image_url[0]}
                alt={`게시글 이미지`}
                width={120}
            height={120}
            className="mr-4 rounded-lg object-cover"
              />
            )}
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-600 hover:underline">
                {comment.posts.title}
              </h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(comment.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                삭제
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {new Date(comment.posts.created_at).toLocaleDateString()}
            </p>
            <p className={`mt-2 ${isContentVisible ? "" : "line-clamp-2"}`}>
              {comment.comment}
            </p>
          </div>
        </div>
      </Link>

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

export default MyCommentCard;