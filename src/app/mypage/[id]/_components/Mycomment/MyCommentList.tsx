"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
import { useEffect, useState } from "react";
import { deleteComment, updateComment } from "@/app/honeytips/_utils/comment"; // 댓글 관련 API 함수 임포트
import { MyfetchCommentPostsData } from "@/app/mypage/_utils/MyfetchCommentPostsData"; // 댓글 데이터 가져오는 함수 임포트

import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅
import clsx from "clsx"; // clsx 임포트
import MyCommentCard from "@/app/mypage/[id]/_components/Mycomment/MyCommentCard";
import { CommentWithPost } from "@/app/mypage/_types/CommentWithPost";

const CommentList = () => {
  const [comments, setComments] = useState<CommentWithPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadComments = async () => {
    try {
      const userId = await getId();
      if (!userId) {
        console.error("User not logged in");
        return;
      }
      const data = await MyfetchCommentPostsData(userId);
      setComments(data as CommentWithPost[]);
    } catch (error) {
      console.error("댓글 불러오기에 실패했습니다:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
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
        postId:
          comments.find((comment) => comment.id === commentId)?.post_id || "",
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
          <MyCommentCard
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
            onEdit={handleEditComment}
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
          className={clsx(
            "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
            { "cursor-not-allowed opacity-50": currentPage === 1 },
          )}
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
              "mx-1 rounded px-3 py-2",
              currentPage === startButtonIndex + index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black",
              "hover:bg-blue-500",
            )}
          >
            {startButtonIndex + index + 1} {/* 페이지 번호 */}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={clsx(
            "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
            { "cursor-not-allowed opacity-50": currentPage === totalPages },
          )}
        >
          &gt; {/* 다음 페이지 버튼 */}
        </button>
      </div>
    </div>
  );
};

export default CommentList;
