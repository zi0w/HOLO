"use client";

 // 댓글과 게시물 정보를 포함한 타입
import Image from "next/image"; // Next.js의 Image 컴포넌트 가져오기
import Link from "next/link"; // Link 컴포넌트 가져오기
import { useState } from "react"; // 상태 관리
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import { useQuery } from "@tanstack/react-query"; // React Query 임포트

// Supabase 클라이언트 생성
const supabase = createClient();

// 타입 정의
export type User = {
  id: string;
  email: string;
  nickname: string;
  profile_image_url: string | null;
  created_at: string;
};

export type Post = {
  id: string; // 게시물 ID 추가
  title: string;
  content: string;
  created_at: string;
  categories: string;
  post_image_url: string[] | null; // 이미지 URL 배열
};

export type Comment = {
  id: string;
  comment: string;
  created_at: string;
  post_id: string;
  user_id: string;
};

// CommentWithPost 타입 정의
export type CommentWithPost = Comment & {
  users?: User; // 댓글 작성자 정보 (선택적)
  posts: Post; // 게시물 정보
};

// 댓글 데이터 가져오는 쿼리 훅
const fetchCommentPostsData = async (userId: string): Promise<CommentWithPost[]> => {
  const { data, error } = await supabase.from("comments").select(`
    *,
    users(nickname, profile_image_url),
    posts(
      id,
      post_image_url,
      title,
      content,
      created_at,
      categories,
      user_id,
      users(nickname, profile_image_url)
    )
  `).eq("user_id", userId).order("created_at", { ascending: false });

  if (error) {
    console.error("댓글이 달린 게시물 불러오기 실패:", error);
    throw error;
  }

  return data as CommentWithPost[] || []; // 타입 단언 추가
};

const MyCommentCard = ({ comment, onDelete, onEdit }: { comment: CommentWithPost; onDelete: (commentId: string) => void; onEdit: (commentId: string, newContent: string) => void; }) => {
  const [isContentVisible, setIsContentVisible] = useState(false); // 내용 표시 여부

  const handleEdit = () => {
    const newContent = prompt("댓글을 수정하세요:", comment.comment);
    if (newContent) {
      onEdit(comment.id, newContent); // 수정된 내용으로 댓글 업데이트
    }
  };

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
              className="rounded-lg object-cover mr-4" // 스타일 조정
            />
          )}
          <div className="flex-grow"> {/* 제목과 내용이 들어갈 부분 */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-600 hover:underline">
                {comment.posts.title} {/* 게시물 제목 */}
              </h3>
              {/* 수정 및 삭제 버튼 */}
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(comment.id); // 삭제 버튼 클릭 시 호출
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(); // 수정 버튼 클릭 시 호출
                  }}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  수정
                </button>
              </div>
            </div>

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





