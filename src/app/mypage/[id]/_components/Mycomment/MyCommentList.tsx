"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
import { useEffect, useState } from "react";
// API 호출 함수
import { deleteComment, updateComment } from "@/app/honeytips/_utils/comment";
 // 페이지네이션 훅
import { MyfetchCommentPostsData } from "@/app/mypage/_utils/MyfetchCommentPostsData";
import clsx from "clsx"; // 클래스 이름 조합 라이브러리
import CommentCard from "./MyCommentCard"; // CommentCard 컴포넌트
import { usePagination } from "@/hooks/usePagination";

const CommentList = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = async () => {
    try {
      const userId = await getId(); // 사용자 ID 가져오기
      if (!userId) {
        console.error("User not logged in");
        return;
      }
      const data = await MyfetchCommentPostsData(userId); // 사용자 ID에 따라 댓글이 달린 게시물 데이터 가져오기
      setComments(data); // 상태 업데이트
    } catch (error) {
      console.error("댓글 불러오기에 실패했습니다:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId); // 댓글 삭제 API 호출
      loadComments(); // 댓글 삭제 후 다시 로드
    } catch (error) {
      console.error("댓글 삭제 중 오류가 발생했습니다:", error);
    }
  };

  const handleEditComment = async (commentId: string, newContent: string) => {
    try {
      await updateComment({
        editingComment: newContent,
        editingId: commentId,
        postId: comments.find((comment) => comment.id === commentId).post_id, // 댓글의 게시물 ID를 가져옴
      });
      loadComments(); // 댓글 수정 후 다시 로드
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    loadComments(); // 컴포넌트 마운트 시 댓글 로드
  }, []);

  const {
    currentItems: currentComments,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(comments, 20); // 페이지네이션 훅 사용

  if (isLoading) {
    return <p>로딩중...</p>; // 로딩 중 표시
  }

  return (
    <div className="container mx-auto p-4">
      {currentComments.length > 0 ? (
        currentComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
          />
        ))
      ) : (
        <p>댓글이 없습니다.</p> // 댓글이 없을 경우 표시
      )}

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
            className={clsx(
              `mx-1 rounded px-3 py-2 ${
                currentPage === startButtonIndex + index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              } hover:bg-blue-500`,
            )}
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

export default CommentList;
