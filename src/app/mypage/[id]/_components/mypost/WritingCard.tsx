"use client";

import ConfirmModal from "@/app/mypage/_components/ConfirmModal";
import type { Post } from "@/app/mypage/_types/myPage";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { type FC, useState } from "react";

type WritingCardProps = {
  post: Post;
  onDelete: (postId: string) => void;
};

const WritingCard: FC<WritingCardProps> = ({ post, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
      setIsConfirm(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsConfirm(false);
  };

  return (
    <>
      <div
        className={clsx(
          "flex h-[64px] w-full items-center justify-between px-5",
        )}
      >
        <Link
          href={`/honeytips/${post.id}`}
          className={clsx("flex flex-1 items-center gap-3")}
        >
          {post.post_image_url && post.post_image_url.length > 0 ? (
            <div
              className={clsx(
                "relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[4px]",
              )}
            >
              <Image
                src={post.post_image_url[0]}
                alt={`게시글 이미지`}
                fill
                className={clsx("object-cover")}
                priority
              />
            </div>
          ) : (
            <div className={clsx("h-[48px] w-[48px] shrink-0")} />
          )}
          <div className={clsx("flex min-w-0 flex-1 flex-col gap-[2px]")}>
            <div className={clsx("flex w-full items-center justify-between")}>
              <h3
                className={clsx(
                  "line-clamp-1 text-[16px] font-medium text-[#424242]",
                )}
              >
                {post.title}
              </h3>
              <span
                className={clsx("-mt-[5px] ml-2 text-[14px] text-[#8F8F8F]")}
              >
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
            <p className={clsx("line-clamp-1 text-[14px] text-[#8F8F8F]")}>
              {post.content}
            </p>
          </div>
        </Link>
        <div className={clsx("ml-4 flex items-center")}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsConfirm(true);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center border border-[#424242] text-[12px] text-[#424242] h-[28px] w-[38px] px-[7px] py-[6px]"
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

export default WritingCard;