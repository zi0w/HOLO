"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
import { useEffect, useState } from "react";
import { MyfetchWritingPostsData } from "@/app/mypage/_utils/MyfetchWritingPostsData"; // 작성한 게시글 데이터 가져오는 함수 임포트
// MyPostCard 컴포넌트 임포트
// Post 타입 임포트
import { deletePost } from "@/app/honeytips/_utils/detail"; // 게시글 삭제 API 함수 임포트
import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅 임포트
import MyWritingCard from "./MyWritingCard";
import { Post } from "@/app/honeytips/_types/honeytips.type";

const MyWritingList = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 상태 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  const loadPosts = async () => {
    try {
      const userId = await getId(); // 사용자 ID 가져오기
      if (!userId) {
        console.error("User not logged in");
        return;
      }
      const data = await MyfetchWritingPostsData(userId); // 작성한 게시글 데이터 로드
      setPosts(data as Post[]); // 상태 업데이트
    } catch (error) {
      console.error("게시글 불러오기에 실패했습니다:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId); // 게시글 삭제 요청
      loadPosts(); // 삭제 후 다시 로드
    } catch (error) {
      console.error("게시글 삭제 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    loadPosts(); // 컴포넌트 마운트 시 게시글 로드
  }, []);

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(posts, 5); // 페이지네이션 훅 사용 (페이지당 5개 게시글)

  if (isLoading) {
    return <p>로딩중...</p>; // 로딩 중 표시
  }

  return (
    <div className="container mx-auto p-4">
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <MyWritingCard
            key={post.id}
            post={post}
            onDelete={handleDeletePost}
          /> // 각 게시글 카드 표시
        ))
      ) : (
        <p>작성한 게시글이 없습니다.</p> // 게시글이 없을 경우 메시지 표시
      )}

      {/* 페이지네이션 UI */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
        >
          &lt; {/* 이전 페이지 버튼 */}
        </button>

        {Array.from({
          length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
        }).map((_, index) => (
          <button
            key={startButtonIndex + index}
            onClick={() => goToPage(startButtonIndex + index + 1)}
            className={`mx-1 rounded px-3 py-2 ${currentPage === startButtonIndex + index + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} hover:bg-blue-500`}
          >
            {startButtonIndex + index + 1} {/* 페이지 번호 */}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
        >
          &gt; {/* 다음 페이지 버튼 */}
        </button>
      </div>
    </div>
  );
};

export default MyWritingList;
