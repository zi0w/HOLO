"use client";

import LikeButton from "@/app/honeytips/[id]/_components/LikeButton"; // 좋아요 버튼 가져오기
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
    users?: {
      // users 속성을 옵셔널로 설정
      nickname: string;
      profile_image_url: string | null; // 프로필 이미지 URL
    };
  };
  onDelete: (postId: string) => void; // 게시물 삭제 콜백
};

const LikeCard = ({ post, onDelete }: PostLikeCardProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("이 게시물을 삭제하시겠습니까?");
    if (confirmed) {
      onDelete(post.id); // 부모에게 삭제 알림
    }
  };

  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Link 태그를 사용하여 게시물 제목 클릭 시 해당 게시물로 이동 */}
        <Link
          href={`/honeytips/${post.id}`}
          className="flex-1 text-blue-600 hover:underline"
        >
          <h3 className="font-bold">{post.title}</h3>
        </Link>
        <div className="flex items-center">
          <LikeButton postId={post.id} />
          <button onClick={handleDelete} className="ml-2 text-red-500">
            삭제
          </button>
        </div>
      </div>

      {/* 프로필 이미지 표시 */}
      <div className="mt-2 flex items-center">
        {post.users?.profile_image_url ? ( // 옵셔널 체이닝 사용
          <Image
            src={post.users.profile_image_url}
            alt={`${post.users.nickname}의 프로필 이미지`}
            width={40} // 원하는 너비
            height={40} // 원하는 높이
            className="rounded-full" // 원형으로 만들기 위해 클래스 추가
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
            <span className="text-gray-500">N/A</span>
            {/* 기본 이미지가 없을 경우 대체 텍스트 */}
          </div>
        )}
        {post.users?.nickname && ( // 옵셔널 체이닝 사용
          <span className="ml-2 text-sm">{post.users.nickname}</span> // 사용자 닉네임 표시
        )}
      </div>

      <p className="text-xs text-gray-500">
        {dayjs(post.created_at).fromNow()}
      </p>

      {/* 내용 표시 */}
      <p className={`mt-2 ${isContentVisible ? "" : "line-clamp-2"}`}>
        {post.content}
      </p>

      {/* 더보기/숨기기 버튼을 내용 아래에 위치시키기 */}
      <button onClick={toggleContentVisibility} className="mt-2 text-blue-500">
        {isContentVisible ? "숨기기" : "더보기"}
      </button>
    </div>
  );
};

export default LikeCard;
