// src/app/mypage/[id]/_components/Mypost/MyWritingCard.tsx
"use client";

import type { Post } from "@/app/mypage/_types/mypage";
import Modal from "@/components/common/Modal";
import useModalStore from "@/store/modalStore";
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
}

const MyWritingCard: React.FC<MyWritingCardProps> = ({ post, onDelete, isDeleting }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { setIsModalOpen, setIsConfirm, isConfirm } = useModalStore();

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleDelete = async () => {
    try {
      await onDelete(post.id);
      setIsConfirm(false);
      setIsModalOpen(true); // "삭제되었습니다" 모달 표시
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  if (isDeleting) return null;

  return (
    <div className="flex h-[64px] w-full items-center justify-between px-5">
      <Link 
        href={`/honeytips/${post.id}`}
        className="flex items-center gap-3 flex-1"
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
        <div className="flex flex-col gap-[2px] flex-1 min-w-0">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-[16px] font-medium text-[#424242] line-clamp-1">{post.title}</h3>
            <span className="text-[14px] text-[#8F8F8F] ml-2 -mt-[5px]">
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\. /g, '.').slice(0, -1)}
            </span>
          </div>
          <p className="text-[14px] text-[#8F8F8F] line-clamp-1">{post.content}</p>
        </div>
      </Link>
      <div className="flex items-center ml-4">
        <Modal
          text="삭제"
          onAction={handleDelete}
          onClose={() => {
            setIsModalOpen(false);
            setIsConfirm(false);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsConfirm(true);
            setIsModalOpen(true);
          }}
          disabled={isDeleting}
          className="flex items-center justify-center w-[24px] h-[16px] text-[12px] text-[#424242] border border-[#424242]"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default MyWritingCard;