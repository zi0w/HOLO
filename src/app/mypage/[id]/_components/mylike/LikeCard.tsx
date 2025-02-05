"use client";

import { formatDate } from "@/app/mypage/[id]/_components/mylike/_utils/formatDate";
import MyLikeButton from "@/app/mypage/_components/MyLikeButton";
import RemoveModal from "@/app/mypage/_components/RemoveModal";
import type { Post } from "@/app/mypage/_types/myPage";
import { useModalStore } from "@/store/useMypageModalStore";
import Image from "next/image";
import Link from "next/link";

export type LikeCardProps = {
  post: Post;
  onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
};

const MyLikeCard = ({ post, onLikeChange }: LikeCardProps) => {
  const { isOpen, selectedId, modalType, openModal, closeModal } =
    useModalStore();

  const handleLikeCancel = async () => {
    try {
      await onLikeChange(post.id, "delete");
      closeModal();
    } catch (error) {
      console.error("좋아요 취소 실패:", error);
      closeModal();
    }
  };

  return (
    <>
      <div className="flex h-16 w-full items-center justify-between px-5">
        <Link
          href={`/honeytips/${post.id}`}
          className="flex w-[calc(100%-28px)] flex-1 items-center gap-3"
        >
          {post.post_image_url && post.post_image_url.length > 0 ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
              <Image
                src={post.post_image_url[0]}
                alt={post.title}
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
                {formatDate(post.created_at)}
              </span>
            </div>
            <p className="line-clamp-1 text-sm text-base-800">{post.content}</p>
          </div>
        </Link>
        <div className="ml-4 flex items-center">
          <div className="flex items-center justify-center">
            <MyLikeButton
              postId={post.id}
              onLikeChange={onLikeChange}
              onClick={() => openModal(post.id, "like")}
            />
          </div>
        </div>
      </div>

      <RemoveModal
        isOpen={isOpen && selectedId === post.id}
        modalType={modalType}
        onAction={handleLikeCancel}
        onClose={closeModal}
      />
    </>
  );
};

export default MyLikeCard;
