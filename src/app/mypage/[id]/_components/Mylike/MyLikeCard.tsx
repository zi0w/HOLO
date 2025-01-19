// components/MyLikeCard.tsx
"use client";

import type { Post } from "@/app/mypage/[id]/_components/_type/types";
import LikeButton from "@/app/mypage/_components/MyLikeButton";
import Image from "next/image";
import Link from "next/link";

type MyLikeCardProps = {
  post: Post;
  onLikeChange: (postId: string, action: "delete" | "add") => Promise<void>;
};

const MyLikeCard: React.FC<MyLikeCardProps> = ({ post, onLikeChange }) => {
  const handleLikeChange = async (postId: string, action: "delete" | "add") => {
    await onLikeChange(postId, action);
  };

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <div className="flex-1">
          <Link
            href={`/honeytips/${post.id}`}
            className="flex items-start gap-4"
          >
            {post.post_image_url && post.post_image_url.length > 0 && (
              <div className="relative h-[120px] w-[120px] overflow-hidden rounded-lg">
                <Image
                  src={post.post_image_url[0]}
                  alt={`게시글 이미지`}
                  width={120}
                  height={120}
                  className="mr-4 rounded-lg object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
              <p className="mb-2 text-gray-600">{post.content}</p>
              <div className="flex items-center">
                <LikeButton
                  postId={post.id}
                  isLiked={true}
                  onLikeChange={handleLikeChange}
                />
              </div>
            </div>
          </Link>
        </div>
        <p className="text-xs text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MyLikeCard;
