"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
 // 댓글 카드 컴포넌트
import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"; // React Query 임포트
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import type { CommentWithPost } from "@/app/mypage/_types/CommentWithPost";
import MyCommentCard from "@/app/mypage/[id]/_components/Mycomment/MyCommentCard";

// Supabase 클라이언트 생성
const supabase = createClient();

// 댓글 데이터 가져오는 쿼리 훅
const fetchCommentPostsData = async (userId: string) => {
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

  if (error) throw new Error(error.message);
  
  return data;
};

const useCommentsQuery = (userId: string) => {
  return useQuery<CommentWithPost[], Error>({
    queryKey: ["comments", userId],
    queryFn: () => fetchCommentPostsData(userId),
    enabled: !!userId,
  });
};

// 댓글 삭제 함수
const deleteComment = async (id: string) => {
   const { error } = await supabase.from("comments").delete().eq("id", id);
   if (error) throw new Error(error.message);
};

// 댓글 수정 함수
const updateComment = async (id: string, newContent: string) => {
   const { data, error } = await supabase.from("comments").update({ comment: newContent }).eq("id", id).select();
   if (error) throw new Error(error.message);
   return data;
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

  const handleEditComment = async (id: string, newContent: string) => {
    try {
      await updateComment(id, newContent);
      console.log(`댓글 ${id} 수정 완료`);
      // 성공적으로 수정 후 다시 데이터를 불러오거나 쿼리 무효화 로직 추가 가능
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {currentComments.length > 0 ? (
        currentComments.map((comment) => (
          <MyCommentCard
            key={comment.id} 
            comment={comment} 
            onDelete={handleDeleteComment} 
            onEdit={handleEditComment} // 수정 기능 연결
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
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          &lt; {/* 이전 페이지 버튼 */}
        </button>

        {Array.from({
          length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
        }).map((_, index) => (
          <button
            key={startButtonIndex + index}
            onClick={() => goToPage(startButtonIndex + index + 1)}
            className={`mx-1 rounded px-3 py-2 ${
              currentPage === startButtonIndex + index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black"
            } hover:bg-blue-500`}
          >
            {startButtonIndex + index + 1} {/* 페이지 번호 */}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          &gt; {/* 다음 페이지 버튼 */}
        </button>
      </div>
    </div>
  );
};

export default MyCommentList;
