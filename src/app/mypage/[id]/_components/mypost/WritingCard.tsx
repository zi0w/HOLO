"use client";

import RemoveModal from "@/app/mypage/_components/RemoveModal";
import type { Post } from "@/app/mypage/_types/myPage";
import { useModalStore } from "@/store/useMypageModalStore";

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
    useModalStore();

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
      <div className="flex h-16 w-full items-center justify-between px-5">
        <Link
          href={`/honeytips/${post.id}`}
          className="flex w-[calc(100%-36px)] flex-1 items-center gap-3"
        >
          {post.post_image_url && post.post_image_url.length > 0 ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
              <Image
                src={post.post_image_url[0]}
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
                {post.title}
              </p>
              <span className="-mt-1 ml-2 text-sm text-base-500">
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
            <p className="line-clamp-1 text-sm text-base-800">{post.content}</p>
          </div>
        </Link>
        <div className="ml-4 flex items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              openModal(post.id, "post");
            }}
            disabled={isDeleting}
            className="flex h-7 w-[38px] items-center justify-center rounded border border-base-800 px-[7px] py-1.5 text-xs text-base-800 disabled:opacity-50"
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
