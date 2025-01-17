//완성본
"use client";

import { useState } from "react";
import Image from "next/image"; // Next.js의 Image 컴포넌트 가져오기
import Link from "next/link"; // Link 컴포넌트 가져오기

// CommentWithPost 타입 정의
export type CommentWithPost = {
  id: string;
  comment: string;
  created_at: string;
  post_id: string;
  user_id: string;
  users?: {
    id: string;
    nickname: string;
    profile_image_url: string | null;
  }; // 댓글 작성자 정보 (선택적)
  posts: {
    id: string; // 게시물 ID 추가
    title: string;
    content: string;
    created_at: string; // 게시물 생성 시간 추가
    categories: string;
    post_image_url: string[] | null; // 이미지 URL 배열
  }; // 게시물 정보
};

const MyCommentCard = ({
  comment,
  onDelete,
}: {
  comment: CommentWithPost;
  onDelete: (commentId: string) => void; // 삭제 함수
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false); // 내용 표시 여부

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible); // 내용 표시 상태 토글
  };

  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <Link href={`/honeytips/${comment.post_id}`} className="flex h-full flex-col">
        <div className="flex items-start">
          {/* 게시글 첫 번째 이미지 */}
          {comment.posts.post_image_url && comment.posts.post_image_url.length > 0 && (
            <Image
              src={comment.posts.post_image_url[0]} // 첫 번째 이미지 URL 사용
              alt={`게시글 이미지`}
              width={120} // 원하는 너비 설정
              height={120} // 세로 길이 증가 (길게 설정)
              className="mr-4 rounded-lg object-cover" // 스타일 조정
            />
          )}
          <div className="flex-grow"> {/* 제목과 내용이 들어갈 부분 */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-600 hover:underline">
                {comment.posts.title} {/* 게시물 제목 */}
              </h3>
              {/* 삭제 버튼 */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(comment.id); // 삭제 버튼 클릭 시 호출
                }}
                className="text-red-500 hover:text-red-700"
              >
                삭제
              </button>
            </div>

            {/* 게시물 생성 시간 표시 */}
            <p className="text-xs text-gray-500 mt-1">
              {new Date(comment.posts.created_at).toLocaleDateString()} {/* 날짜 형식으로 변환 */}
            </p>

            {/* 댓글 내용 */}
            <p className={`mt-2 ${isContentVisible ? "" : "line-clamp-2"}`}>
              {comment.comment}
            </p>
          </div>
        </div>
      </Link>

      {/* 더보기/숨기기 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleContentVisibility(); // 내용 표시 상태 토글
        }}
        className="mt-2 text-blue-500"
      >
        {isContentVisible ? "숨기기" : "더보기"}
      </button>
    </div>
  );
};

export default MyCommentCard;



