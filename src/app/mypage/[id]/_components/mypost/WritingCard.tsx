"use client";

import RemoveModal from "@/app/mypage/_components/RemoveModal";
import type { Post } from "@/app/mypage/_types/myPage";
import useModalStore from "@/store/mypagemodal/useMypageModal"; 
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

type WritingCardProps = {
  post: Post;
  onDelete: (postId: string) => Promise<void>;
  isDeleting: boolean;
};

const WritingCard: FC<WritingCardProps> = ({ post, onDelete, isDeleting }) => {
  const { isOpen, selectedId, modalType, openModal, closeModal } =
    useModalStore(); // 변경된 부분

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
      closeModal();
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
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
                  "line-clamp-1 text-[16px] font-medium text-base-800",
                )}
              >
                {post.title}
              </h3>
              <span
                className={clsx("-mt-[5px] ml-2 text-[14px] text-base-500")}
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
            <p className={clsx("line-clamp-1 text-[14px] text-base-800")}>
              {post.content}
            </p>
          </div>
        </Link>
        <div className={clsx("ml-4 flex items-center")}>
          <button
            onClick={(e) => {
              e.preventDefault();
              openModal(post.id, "post"); 
            }}
            disabled={isDeleting}
            className="flex h-[28px] w-[38px] items-center justify-center border border-base-800 px-[7px] py-[6px] text-[12px] text-base-800 disabled:opacity-50"
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>

      <RemoveModal
        isOpen={isOpen && selectedId === post.id} 
        modalType={modalType} 
        onAction={handleDelete}
        onClose={closeModal}
      />
    </>
  );
};

export default WritingCard;

