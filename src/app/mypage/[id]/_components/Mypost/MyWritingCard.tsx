// src/app/mypage/[id]/_components/Mypost/MyWritingCard.tsx
"use client";

import ConfirmModal from "@/app/mypage/_components/ConfirmModal";
import type { Post } from "@/app/mypage/_types/Mypage";

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
};

const MyWritingCard = ({ post, onDelete, isDeleting }: MyWritingCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
      setIsConfirm(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsConfirm(false);
  };

  if (isDeleting) return null;

  return (
    <>
      <div className="flex h-[64px] w-full items-center justify-between px-5">
        <Link
          href={`/honeytips/${post.id}`}
          className="flex flex-1 items-center gap-3"
        >
          {post.post_image_url && post.post_image_url.length > 0 ? (
            <div className="relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[4px]">
              <Image
                src={post.post_image_url[0]}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="h-[48px] w-[48px] shrink-0" />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
            <div className="flex w-full items-center justify-between">
              <h3 className="line-clamp-1 text-[16px] font-medium text-[#424242]">
                {post.title}
              </h3>
              <span className="-mt-[5px] ml-2 text-[14px] text-[#8F8F8F]">
                {new Date(post.created_at)
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\. /g, ".")
                  .slice(0, -1)}
              </span>
            </div>
            <p className="line-clamp-1 text-[14px] text-[#8F8F8F]">
              {post.content}
            </p>
          </div>
        </Link>
        <div className="ml-4 flex items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsConfirm(true);
              setIsModalOpen(true);
            }}
            disabled={isDeleting}
            className="flex h-[16px] w-[24px] items-center justify-center border border-[#424242] text-[12px] text-[#424242]"
          >
            삭제
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        isConfirm={isConfirm}
        text="삭제"
        onAction={handleDelete}
        onClose={handleClose}
      />
    </>
  );
};

export default MyWritingCard;

