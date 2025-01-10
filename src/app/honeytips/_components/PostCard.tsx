"use client";

import type { Post } from "@/app/honeytips/_types/honeytips.type";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type PostCardProps = {
  post: Post;
  likesCount: {
    [postId: string]: number;
  };
  commentsCount: {
    [postId: string]: number;
  };
};

const PostCard = ({ post, likesCount, commentsCount }: PostCardProps) => {
  const formatDate = (date: string) => {
    const now = dayjs();
    const createdAt = dayjs(date);

    if (now.diff(createdAt, "hour") < 24) {
      return createdAt.fromNow();
    }
    return createdAt.format("YY.MM.DD");
  };

  return (
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
        <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
      </div>

      <Link href={`/honeytips/${post.id}`}>
        <li
          className={clsx(
            "relative mb-4 flex items-center justify-between gap-2 rounded-lg bg-white p-6 shadow-lg transition-all",
            "hover:scale-105 hover:shadow-2xl",
          )}
        >
          <div className="flex w-full flex-col">
            <h3 className="mb-2 font-bold text-gray-800">{post.title}</h3>
            <p className="line-clamp-2 text-sm text-gray-600">{post.content}</p>
            <div className="mt-4 flex items-center gap-1">
              <FaRegHeart />
              <span className="mr-2 text-xs">{likesCount[post.id] || 0}</span>
              <FaRegCommentAlt />
              <span className="text-xs">{commentsCount[post.id] || 0}</span>
            </div>
          </div>
          <Image
            className="aspect-square rounded bg-gray-500 object-cover"
            src={
              post.post_image_url?.[0] || "https://via.placeholder.com/120x120"
            }
            alt="게시글 이미지"
            width={120}
            height={120}
            loading="lazy"
          />
        </li>
      </Link>
    </div>
  );
};

export default PostCard;
