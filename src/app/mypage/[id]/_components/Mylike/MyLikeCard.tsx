"use client";

import MyLikeButton from "@/app/mypage/_components/MyLikeButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image"; // Next.js의 Image 컴포넌트 가져오기
import Link from "next/link"; // Link 컴포넌트 가져오기
import { useState } from "react";

dayjs.extend(relativeTime);

type PostLikeCardProps = {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
    post_image_url?: string[] | null; // 게시글 이미지 URL 배열 추가
  };
  onLikeChange: () => void;
};

const MyLikeCard = ({ post, onLikeChange }: PostLikeCardProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <Link href={`/honeytips/${post.id}`} className="flex h-full flex-col">
        <div className="flex items-start">
          {/* 게시글 첫 번째 이미지 */}
          {post.post_image_url && post.post_image_url.length > 0 && (
            <Image
              src={post.post_image_url[0]} // 첫 번째 이미지 URL 사용
              alt={`게시글 이미지`}
              width={120} // 원하는 너비 설정
              height={120} // 세로 길이 증가 (길게 설정)
              className="rounded-lg object-cover mr-4" // 스타일 조정
            />
          )}
          <div className="flex-grow"> {/* 제목과 내용이 들어갈 부분 */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-600 hover:underline">
                {post.title}
              </h3>
              <div className="flex items-center">
                <MyLikeButton postId={post.id} onLikeChange={onLikeChange} />
              </div>
            </div>

            <p className="text-xs text-gray-500">
              {dayjs(post.created_at).fromNow()}
            </p>

            {/* 게시글 내용 */}
            <p className={`mt-2 ${isContentVisible ? "" : "line-clamp-2"}`}>
              {post.content}
            </p>
          </div>
        </div>
      </Link>

      {/* Move the button outside of the Link */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleContentVisibility();
        }}
        className="mt-2 text-blue-500"
      >
        {isContentVisible ? "숨기기" : "더보기"}
      </button>
    </div>
  );
};

export default MyLikeCard;
