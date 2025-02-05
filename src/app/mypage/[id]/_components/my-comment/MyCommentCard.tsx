"use client";

import RemoveModal from "@/app/mypage/_components/RemoveModal";
import type { CommentWithPost } from "@/app/mypage/_types/useMyTypes";
import { useModalStore } from "@/store/useMypageModalStore";

import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

type MyCommentCardProps = {
  comment: CommentWithPost;
  onDelete: (commentId: string) => Promise<void>;
};

const MyCommentCard: FC<MyCommentCardProps> = ({ comment, onDelete }) => {
  const { isOpen, selectedId, modalType, openModal, closeModal } =
    useModalStore();

  const handleDelete = async () => {
    try {
      await onDelete(comment.id);
      closeModal();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  return (
    <>
      <div className="flex h-16 w-full items-center justify-between px-5">
        <Link
          href={`/honeytips/${comment.post_id}`}
          className="flex w-[calc(100%-36px)] flex-1 items-center gap-3"
        >
          {comment.posts?.post_image_url &&
          comment.posts.post_image_url.length > 0 ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
              <Image
                src={comment.posts.post_image_url[0]}
                alt={`게시글 이미지`}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="h-12 w-12 shrink-0" />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <div className="flex w-full items-center justify-between">
              <p className="line-clamp-1 text-base text-base-800">
                {comment.posts?.title}
              </p>
              <span className="-mt-1 ml-2 text-sm text-base-500">
                {new Date(comment.created_at)
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\. /g, ".")
                  .slice(0, -1)}
              </span>
            </div>
            <p className="line-clamp-1 text-sm text-base-800">
              {comment.comment}
            </p>
          </div>
        </Link>
        <div className="ml-4 flex items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              openModal(comment.id, "comment");
            }}
            className="flex h-7 w-[38px] items-center justify-center rounded border border-base-800 px-[7px] py-1.5 text-xs text-base-800 disabled:opacity-50"
          >
            삭제
          </button>
        </div>
      </div>

      <RemoveModal
        isOpen={isOpen && selectedId === comment.id}
        modalType={modalType}
        onAction={handleDelete}
        onClose={closeModal}
      />
    </>
  );
};

export default MyCommentCard;
