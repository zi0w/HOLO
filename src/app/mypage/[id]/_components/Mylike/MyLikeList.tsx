"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
import MyLikeCard from "@/app/mypage/[id]/_components/Mylike/MyLikeCard";

import Pagination from "@/components/common/Pagination"; // Pagination 컴포넌트 임포트
import usePagination from "@/hooks/usePagination";
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import { useQuery } from "@tanstack/react-query"; // React Query 임포트
import { useEffect, useState } from "react";

// 타입 정의 (위에서 수정한 내용 반영)
// type User = {
//   id: string;
//   email: string;
//   nickname: string;
//   profile_image_url: string | null;
//   created_at: string;
// };

type Like = {
  user_id: string; // 'id' 대신 'user_id'
};

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  categories: string;
  post_image_url: string[] | null; // 이미지 URL 배열
  user_id: string;
  likes: Like[]; // 좋아요 정보
  users: {
    nickname: string; // 작성자 닉네임
    profile_image_url: string | null; // 작성자 프로필 이미지 URL
  };
};

// Supabase 클라이언트 생성
const supabase = createClient();

// Fetch all posts with their likes and user information
const fetchLikePostsData = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "*, likes(user_id), users(nickname, profile_image_url), post_image_url",
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

const MyLikeList = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // 사용자 ID 가져오기
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  // 좋아요한 게시물 데이터 가져오기
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["likedPosts"],
    queryFn: fetchLikePostsData,
  });

  // 사용자 ID에 따라 좋아요한 게시물 필터링
  const likedPosts =
    posts?.filter((post) =>
      post.likes.some((like) => like.user_id === userId),
    ) || [];

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(likedPosts, 20); // 페이지네이션 훅 사용

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
          <MyLikeCard key={post.id} post={post} onLikeChange={() => {}} />
        ))
      ) : (
        <p>좋아요한 게시물이 없습니다.</p> // 좋아요한 게시물이 없을 경우 표시
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

export default MyLikeList;

// "use client";

// import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
// import LikeCard from "@/app/mypage/[id]/_components/Mylike/MyLikeCard"; // LikeCard 컴포넌트
// import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅
// import { useEffect, useState } from "react";
// import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
// import { useQuery } from "@tanstack/react-query"; // React Query 임포트

// // 타입 정의 (위에서 수정한 내용 반영)
// type User = {
//   id: string;
//   email: string;
//   nickname: string;
//   profile_image_url: string | null;
//   created_at: string;
// };

// type Like = {
//   user_id: string; // 'id' 대신 'user_id'
// };

// type Post = {
//   id: string;
//   title: string;
//   content: string;
//   created_at: string;
//   categories: string;
//   post_image_url: string[] | null; // 이미지 URL 배열
//   user_id: string;
//   likes: Like[]; // 좋아요 정보
//   users: {
//     nickname: string; // 작성자 닉네임
//     profile_image_url: string | null; // 작성자 프로필 이미지 URL
//   };
// };

// // Supabase 클라이언트 생성
// const supabase = createClient();

// // Fetch all posts with their likes and user information
// const fetchLikePostsData = async (): Promise<Post[]> => {
//   const { data, error } = await supabase
//     .from("posts")
//     .select("*, likes(user_id), users(nickname, profile_image_url), post_image_url")
//     .order("created_at", { ascending: false });

//   if (error) {
//     throw error;
//   }

//   return data || [];
// };

// const MyLikeList = () => {
//   const [userId, setUserId] = useState<string | null>(null);

//   // 사용자 ID 가져오기
//   useEffect(() => {
//     const fetchUserId = async () => {
//       const id = await getId();
//       setUserId(id);
//     };
//     fetchUserId();
//   }, []);

//   // 좋아요한 게시물 데이터 가져오기
//   const { data: posts, isLoading, error } = useQuery<Post[], Error>({
//     queryKey: ["likedPosts"],
//     queryFn: fetchLikePostsData,
//   });

//   // 사용자 ID에 따라 좋아요한 게시물 필터링
//   const likedPosts = posts?.filter(post =>
//     post.likes.some(like => like.user_id === userId)
//   ) || [];

//   const {
//     currentItems: currentPosts,
//     currentPage,
//     totalPages,
//     startButtonIndex,
//     maxButtonsToShow,
//     nextPage,
//     prevPage,
//     goToPage,
//   } = usePagination(likedPosts, 20); // 페이지네이션 훅 사용

//   if (isLoading) {
//     return <p>로딩중입니다...</p>; // 로딩 중 표시
//   }

//   if (error) {
//     return <p>에러가 발생했습니다: {error.message}</p>; // 에러 처리
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {currentPosts.length > 0 ? (
//         currentPosts.map((post) => (
//           <LikeCard key={post.id} post={post} onLikeChange={() => {}} />
//         ))
//       ) : (
//         <p>좋아요한 게시물이 없습니다.</p> // 좋아요한 게시물이 없을 경우 표시
//       )}

//       {/* 페이지네이션 UI */}
//       <div className="mt-4 flex items-center justify-center">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//         >
//           &lt; {/* 이전 페이지 버튼 */}
//         </button>

//         {Array.from({
//           length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
//         }).map((_, index) => (
//           <button
//             key={startButtonIndex + index}
//             onClick={() => goToPage(startButtonIndex + index + 1)}
//             className={`mx-1 rounded px-3 py-2 ${
//               currentPage === startButtonIndex + index + 1
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-300 text-black"
//             } hover:bg-blue-500`}
//           >
//             {startButtonIndex + index + 1} {/* 페이지 번호 */}
//           </button>
//         ))}

//         <button
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//         >
//           &gt; {/* 다음 페이지 버튼 */}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyLikeList;
