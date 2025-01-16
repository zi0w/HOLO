"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기// 페이지네이션 훅
import LikeCard from "@/app/mypage/[id]/_components/Mylike/MyLikeCard"; // LikeCard 컴포넌트
import { MyfetchLikePostsData } from "@/app/mypage/_utils/MyfetchLikePostsData";
import usePagination from "@/hooks/usePagination";

// API 호출 함수
import clsx from "clsx"; // 클래스 이름 조합 라이브러리
import { useEffect, useState } from "react";

const MyLikeList = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const userId = await getId(); // 사용자 ID 가져오기
      if (!userId) {
        console.error("User not logged in");
        return;
      }
      const data = await MyfetchLikePostsData(); // 좋아요한 게시물 데이터 가져오기

     

      const likedPosts = data.filter(
        (post) => post.likes.some((like) => like.user_id === userId), // 사용자가 좋아요를 누른 게시물 필터링
      );

      

      setPosts(likedPosts); // 상태 업데이트
    } catch (error) {
      console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    loadPosts(); // 컴포넌트 마운트 시 게시물 로드
  }, []);

  const handleLikeChange = () => {
    loadPosts(); // 좋아요 상태 변경 시 게시물 다시 로드
  };

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(posts, 20); // 페이지네이션 훅 사용

  if (isLoading) {
    return <p>로딩중입니다...</p>; // 로딩 중 표시
  }

  return (
    <div className="container mx-auto p-4">
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <LikeCard key={post.id} post={post} onLikeChange={handleLikeChange} />
        ))
      ) : (
        <p>좋아요한 게시물이 없습니다.</p> // 좋아요한 게시물이 없을 경우 표시
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

export default MyLikeList;
