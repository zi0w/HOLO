"use client";

import type { Post } from "@/app/honeytips/_types/honeytips.type"; // Post 타입 임포트
import Image from "next/image";
import Link from "next/link";

type MyWritingCardProps = {
  post: Post; // 게시글 데이터
  onDelete: (postId: string) => void; // 삭제 핸들러
};

const MyWritingCard = ({ post, onDelete }: MyWritingCardProps) => {
  return (
    <div className="mb-4 block rounded-lg border p-4 shadow-md hover:bg-gray-100">
      <Link href={`/honeytips/${post.id}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {post.users?.profile_image_url ? (
              <Image
                src={post.users.profile_image_url}
                alt={`${post.users.nickname || "작성자"}의 프로필 이미지`}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                <span className="text-gray-500">N/A</span>
              </div>
            )}
            <span className="ml-2 font-bold">
              {post.users.nickname || "작성자"}
            </span>
          </div>
        </div>
        <h4 className="mt-2 font-semibold">{post.title}</h4>
        <p className="mt-2 line-clamp-2">{post.content}</p>
      </Link>
      <div className="mt-2 flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(post.id); // 삭제 버튼 클릭 시 onDelete 호출
          }}
          className="text-red-500 hover:text-red-700"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default MyWritingCard;
