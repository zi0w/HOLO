//최종이니까 노타치~~~
"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
import MyWritingCard from "@/app/mypage/[id]/_components/Mypost/MyWritingCard"; // MyWritingCard 컴포넌트
import Pagination from "@/components/common/Pagination"; // Pagination 컴포넌트 임포트
import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import { useQuery } from "@tanstack/react-query"; // React Query 임포트
import { useEffect, useState } from "react";

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

// 작성한 게시물 데이터 가져오는 쿼리 훅
const fetchMyPostsData = async (userId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    *,
    users(nickname, profile_image_url)
  `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("작성한 게시물 불러오기 실패:", error);
    throw error;
  }

  return (data as Post[]) || []; // 타입 단언 추가
};

const useMyPostsQuery = (userId: string) => {
  return useQuery<Post[], Error>({
    queryKey: ["myPosts", userId],
    queryFn: () => fetchMyPostsData(userId),
    enabled: !!userId, // userId가 있을 때만 쿼리를 실행
  });
};

// 게시물 삭제 함수
const deletePost = async (id: string) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
};

const MyWritingList = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  // 작성한 게시물 데이터 가져오기
  const { data: posts, isLoading, error } = useMyPostsQuery(userId || "");

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      console.log(`게시물 ${id} 삭제 완료`);
      // 성공적으로 삭제 후 다시 데이터를 불러오거나 쿼리 무효화 로직 추가 가능
    } catch (error) {
      console.error("게시물 삭제 중 오류가 발생했습니다:", error);
    }
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
  } = usePagination(posts || [], 20); // 페이지네이션 훅 사용

  if (isLoading) {
    return <p>로딩중입니다...</p>; // 로딩 중 표시
  }

  if (error) {
    return <p>에러가 발생했습니다: {error.message}</p>; // 에러 처리
  }

  return (
    <div className="container mx-auto p-4">
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <MyWritingCard key={post.id} post={post} onDelete={handleDeletePost} />
        ))
      ) : (
        <p>작성한 게시물이 없습니다.</p> // 작성한 게시물이 없을 경우 표시
      )}

      {/* 페이지네이션 UI */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        startButtonIndex={startButtonIndex}
        maxButtonsToShow={maxButtonsToShow}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        onGoToPage={goToPage}
      />
    </div>
  );
};

export default MyWritingList;
