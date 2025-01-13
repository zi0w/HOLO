"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
import { fetchLikePostsData } from "@/app/mypage/_utils/Likepost"; // 좋아요 게시물 데이터 가져오기
import { useEffect, useState } from "react";
import LikeCard from "./LikeCard";

const LikeList = () => {
  const [posts, setPosts] = useState<any[]>([]); // 게시물 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [userId, setUserId] = useState<string | null>(null); // 사용자 ID 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 20; // 한 페이지에 표시할 게시물 수

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const currentUserId = await getId(); // 현재 사용자 ID 가져오기
        setUserId(currentUserId);

        // 좋아요 게시물 데이터 가져오기
        const data = await fetchLikePostsData();

        // 현재 사용자가 좋아요를 누른 게시물 필터링
        const filteredPosts = data.filter((post) =>
          post.likes.some((like) => like.user_id === currentUserId),
        );

        setPosts(filteredPosts); // 필터링된 게시물 상태 업데이트
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    loadPosts();
  }, []);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); // 삭제된 게시물 상태 업데이트
  };

  if (isLoading) {
    return <p>로딩중...</p>; // 로딩 중일 때 메시지 표시
  }

  // 현재 페이지에 해당하는 게시물 계산
  const totalPages = Math.ceil(posts.length / postsPerPage); // 총 페이지 수 계산
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  ); // 현재 페이지의 게시물

  // 페이지네이션 관련 변수 설정
  const maxButtonsToShow = 5; // 최대 표시할 버튼 수
  const startButtonIndex =
    Math.floor((currentPage - 1) / maxButtonsToShow) * maxButtonsToShow; // 시작 버튼 인덱스

  return (
    <div className="container mx-auto p-4">
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <LikeCard key={post.id} post={post} onDelete={handleDeletePost} />
        ))
      ) : (
        <p>게시물이 없습니다.</p> // 좋아요 게시물이 없을 때 메시지 표시
      )}

      {/* 페이지네이션 버튼 */}
      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          &lt;
        </button>

        {/* 최대 버튼 수만큼의 페이지 번호 버튼 */}
        {Array.from({
          length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
        }).map((_, index) => (
          <button
            key={startButtonIndex + index}
            onClick={() => setCurrentPage(startButtonIndex + index + 1)}
            className={`mx-1 rounded px-3 py-2 ${currentPage === startButtonIndex + index + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} hover:bg-blue-500`}
          >
            {startButtonIndex + index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LikeList;
