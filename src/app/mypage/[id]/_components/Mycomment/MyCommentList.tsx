//완성본
"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
import MyCommentCard from "@/app/mypage/[id]/_components/Mycomment/MyCommentCard";
import type { CommentWithPost } from "@/app/mypage/_types/CommentWithPost";
import type { Post } from "@/app/mypage/_types/MyComment";
import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import { useQuery } from "@tanstack/react-query"; // React Query 임포트
import { useEffect, useState } from "react";

// Supabase 클라이언트 생성
const supabase = createClient();

// 댓글 데이터 가져오는 쿼리 훅
const fetchCommentPostsData = async (
  userId: string,
): Promise<CommentWithPost[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
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
  `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("댓글이 달린 게시물 불러오기 실패:", error);
    throw error;
  }

  return (data as CommentWithPost[]) || []; // 타입 단언 추가
};

// 댓글을 가져오는 쿼리 훅
const useCommentsQuery = (userId: string) => {
  return useQuery<CommentWithPost[], Error>({
    queryKey: ["comments", userId],
    queryFn: () => fetchCommentPostsData(userId),
    enabled: !!userId,
  });
};

// 게시물 데이터 가져오는 쿼리 훅
const fetchPostsData = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(nickname, profile_image_url)")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as Post[]) || []; // 타입 단언 추가
};

// 게시물 쿼리 훅
const usePostsQuery = () => {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPostsData,
  });
};

// 댓글 삭제 함수
const deleteComment = async (id: string) => {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) throw new Error(error.message);
};

const MyCommentList = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  // 댓글 데이터 가져오기
  const { data: comments, isLoading, error } = useCommentsQuery(userId || "");

  // 게시물 데이터 가져오기
  const { data: posts } = usePostsQuery(); // 게시물 데이터 쿼리

  const {
    currentItems: currentComments,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(comments || [], 20); // 페이지네이션 훅 사용

  if (isLoading) {
    return <p>로딩중입니다...</p>; // 로딩 중 표시
  }

  if (error) {
    return <p>에러가 발생했습니다: {error.message}</p>; // 에러 처리
  }

  const handleDeleteComment = async (id: string) => {
    try {
      await deleteComment(id);
      console.log(`댓글 ${id} 삭제 완료`);
      // 성공적으로 삭제 후 다시 데이터를 불러오거나 쿼리 무효화 로직 추가 가능
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {currentComments.length > 0 ? (
        currentComments.map((comment) => (
          <MyCommentCard
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment} // 삭제 기능 연결
          />
        ))
      ) : (
        <p>댓글이 없습니다.</p> // 댓글이 없을 경우 표시
      )}

      {/* 페이지네이션 UI */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-black" // 배경색과 테두리 제거하고 검은색 텍스트로 변경
        >
          &lt; {/* 이전 페이지 버튼 */}
        </button>

        {Array.from({
          length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
        }).map((_, index) => (
          <button
            key={startButtonIndex + index}
            onClick={() => goToPage(startButtonIndex + index + 1)}
            className={`mx-1 px-3 py-2 text-black ${
              currentPage === startButtonIndex + index + 1 ? "font-bold" : ""
            }`} // 배경색과 테두리 제거하고 검은색 텍스트로 변경
          >
            {startButtonIndex + index + 1} {/* 페이지 번호 */}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-black" // 배경색과 테두리 제거하고 검은색 텍스트로 변경
        >
          &gt; {/* 다음 페이지 버튼 */}
        </button>
      </div>
    </div>
  );
};

export default MyCommentList;

