"use client";

import RemoveModal from "@/app/mypage/_components/RemoveModal";
import type { CommentWithPost } from "@/app/mypage/_types/useMyTypes";
import useModalStore from "@/store/mypagemodal/useMypageModal"; 
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

type MyCommentCardProps = {
  comment: CommentWithPost;
  onDelete: (commentId: string) => Promise<void>;
};

const MyCommentCard: FC<MyCommentCardProps> = ({ comment, onDelete }) => {
  const { isOpen, selectedId, modalType, openModal, closeModal } = useModalStore(); 

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
      <div className={clsx("flex h-[64px] w-full items-center justify-between px-5")}>
        <Link
          href={`/honeytips/${comment.post_id}`}
          className={clsx("flex flex-1 items-center gap-3")}
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
          <div className={clsx("flex min-w-0 flex-1 flex-col gap-[2px]")}>
            <div className={clsx("flex w-full items-center justify-between")}>
              <h3 className={clsx("line-clamp-1 text-[16px] font-medium text-base-800")}>
                {comment.posts?.title}
              </h3>
              <span className={clsx("-mt-[5px] ml-2 text-[14px] text-base-500")}>
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
            <p className={clsx("line-clamp-1 text-[14px] text-base-800")}>
              {comment.comment}
            </p>
          </div>
        </Link>
        <div className={clsx("ml-4 flex items-center")}>
          <button
            onClick={(e) => {
              e.preventDefault();
              openModal(comment.id, 'comment');
            }}
            className="flex h-[28px] w-[38px] items-center justify-center border border-base-800 px-[7px] py-[6px] text-[12px] text-base-800"
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

