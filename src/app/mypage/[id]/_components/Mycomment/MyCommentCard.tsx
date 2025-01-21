// src/app/mypage/[id]/_components/Mycomment/MyCommentCard.tsx
"use client";

import type { CommentWithPost } from "@/app/mypage/[id]/_components/_type/Comment";
import ConfirmModal from "@/app/mypage/_components/ConfirmModal";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { type FC, useState } from "react";

type MyCommentCardProps = {
  comment: CommentWithPost;
  onDelete: (commentId: string) => void;
};

const MyCommentCard: FC<MyCommentCardProps> = ({ comment, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(comment.id);
      setIsConfirm(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsConfirm(false);
  };

  return (
    <>
      <div className={clsx("flex h-[64px] w-full items-center justify-between px-5")}>
        <Link 
          href={`/honeytips/${comment.post_id}`}
          className={clsx("flex items-center gap-3 flex-1")}
        >
          {comment.posts?.post_image_url && comment.posts.post_image_url.length > 0 ? (
            <div className={clsx("relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[4px]")}>
              <Image
                src={comment.posts.post_image_url[0]}
                alt={`게시글 이미지`}
                fill
                className={clsx("object-cover")}
                priority
              />
            </div>
          ) : (
            <div className={clsx("h-[48px] w-[48px] shrink-0")} /> 
          )}
          <div className={clsx("flex flex-col gap-[2px] flex-1 min-w-0")}>
            <div className={clsx("flex items-center justify-between w-full")}>
              <h3 className={clsx("text-[16px] font-medium text-[#424242] line-clamp-1")}>
                {comment.posts?.title}
              </h3>
              <span className={clsx("text-[14px] text-[#8F8F8F] ml-2 -mt-[5px]")}>
                {new Date(comment.created_at)
                  .toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                  .replace(/\. /g, '.')
                  .slice(0, -1)}
              </span>
            </div>
            <p className={clsx("text-[14px] text-[#8F8F8F] line-clamp-1")}>
              {comment.comment}
            </p>
          </div>
        </Link>
        <div className={clsx("flex items-center ml-4")}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsConfirm(true);
              setIsModalOpen(true);
            }}
            className={clsx(
              "flex items-center justify-center w-[24px] h-[16px]",
              "text-[12px] text-[#424242] border border-[#424242]"
            )}
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

export default MyCommentCard;


