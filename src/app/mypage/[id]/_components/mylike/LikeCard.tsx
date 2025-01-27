

"use client";

import { formatDate } from "@/app/mypage/[id]/_components/mylike/_utils/formatDate";
import RemoveModal from "@/app/mypage/_components/RemoveModal";
import MyLikeButton from "@/app/mypage/_components/MyLikeButton";
import type { Post } from "@/app/mypage/_types/myPage";
import useLikeModalStore from "@/store/mypagemodal/useLikeModalStore";
import Image from "next/image";
import Link from "next/link";

export type LikeCardProps = {
  post: Post;
  onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
};

const MyLikeCard = ({ post, onLikeChange }: LikeCardProps) => {
  const { isLikeModalOpen, openLikeModal, closeLikeModal } = useLikeModalStore();

  const handleLikeCancel = async () => {
    try {
      await onLikeChange(post.id, "delete");
      closeLikeModal();
    } catch (error) {
      console.error("좋아요 취소 실패:", error);
      closeLikeModal();
    }
  };

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
              <h3 className="line-clamp-1 text-[16px] font-medium text-base-800">
                {post.title}
              </h3>
              <span className="-mt-[5px] ml-2 text-[14px] text-base-500">
                {formatDate(post.created_at)}
              </span>
            </div>
            <p className="line-clamp-1 text-[14px] text-base-800">
              {post.content}
            </p>
          </div>
        </Link>
        <div className="ml-4 flex items-center">
          <div className="flex items-center justify-center">
            <MyLikeButton
              postId={post.id}
              onLikeChange={onLikeChange}
              onClick={openLikeModal}
            />
          </div>
        </div>
      </div>

      <RemoveModal
        isOpen={isLikeModalOpen}
        text="좋아요 취소"
        onAction={handleLikeCancel}
        onClose={closeLikeModal}
      />
    </>
  );
};

export default MyLikeCard;


