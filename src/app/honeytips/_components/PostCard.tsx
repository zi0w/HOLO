"use client";

import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { formatDate } from "@/app/honeytips/_utils/formatDate";
import SmallComment from "@/assets/images/honeytips/comment.svg";
import SmallDot from "@/assets/images/honeytips/dot.svg";
import SmallHeart from "@/assets/images/honeytips/heart.svg";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  post: Post;
  likesCount: number;
  commentsCount: number;
};

const PostCard = ({ post, likesCount, commentsCount }: PostCardProps) => {
  return (
    <li>
      <Link href={`/honeytips/${post.id}`}>
        <section className="relative flex flex-col gap-5 rounded-lg border border-base-300 p-5 lg:min-w-[358px]">
          <div className="flex w-full items-start gap-[11px]">
            <div className="flex w-full flex-col">
              <p className="mb-[7px] line-clamp-1 font-bold text-black">
                {post.title}
              </p>
              <p className="line-clamp-3 min-h-[72px] text-base-900">
                {post.content}
              </p>
            </div>
            {post.post_image_url?.[0] && (
              <Image
                className="aspect-square h-[103px] w-[103px] rounded object-cover"
                src={post.post_image_url[0]}
                alt="게시글 이미지"
                width={105}
                height={105}
                loading="lazy"
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {post.users?.profile_image_url && (
                  <Image
                    className="h-[21px] w-[21px] rounded-full object-cover"
                    src={post.users.profile_image_url}
                    alt="프로필 이미지"
                    width={21}
                    height={21}
                    loading="lazy"
                  />
                )}
                <p className="mx-1 text-[14px] text-base-600">
                  {post.users.nickname}
                </p>
                <SmallDot />
                <time className="ml-1 text-[14px] text-base-600">
                  {formatDate(post.created_at)}
                </time>
              </div>
            </div>

            <div className="flex items-center gap-3 text-base-600">
              <div className="flex items-center gap-1">
                <SmallHeart />
                <span className="text-xs">{likesCount || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <SmallComment />
                <span className="text-xs">{commentsCount || 0}</span>
              </div>
            </div>
          </div>
        </section>
      </Link>
    </li>
  );
};

export default PostCard;
