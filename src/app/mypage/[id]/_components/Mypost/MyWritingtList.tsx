"use client";

import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
// 작성한 게시물 카드 컴포넌트
import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"; // React Query 임포트
import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
import MyWritingCard from "@/app/mypage/[id]/_components/Mypost/MyWritingCard";

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
  const { data, error } = await supabase.from("posts").select(`
    *,
    users(nickname, profile_image_url)
  `).eq("user_id", userId).order("created_at", { ascending: false });

  if (error) {
    console.error("작성한 게시물 불러오기 실패:", error);
    throw error;
  }

  return data as Post[] || []; // 타입 단언 추가
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
          <MyWritingCard
            key={post.id} 
            post={post} 
            onDelete={handleDeletePost} 
          />
        ))
      ) : (
        <p>작성한 게시물이 없습니다.</p> // 작성한 게시물이 없을 경우 표시
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

export default MyWritingList;
























// "use client";

// import { useEffect, useState } from "react";
// import { getId } from "@/app/honeytips/_utils/auth";
// import MyWritingCard from "./MyWritingCard";
// import usePagination from "@/hooks/usePagination";
// import { myDeleteCommentMutation } from "@/app/mypage/[id]/_hooks/MyCommentMutations";
// import { myPostsQuery } from "@/app/mypage/[id]/_hooks/MyActivityQueries";

// const MyWritingList = () => {
//   const [userId, setUserId] = useState<string | null>(null);

//   // 사용자 ID를 가져오는 useEffect
//   useEffect(() => {
//     const fetchUserId = async () => {
//       const id = await getId();
//       setUserId(id);
//     };
//     fetchUserId();
//   }, []);

//   // React Query를 사용하여 게시글 데이터 가져오기
//   const { data: posts, isLoading, error } = myPostsQuery(userId || "");
//   const deleteMutation = myDeleteCommentMutation();

//   // 페이지네이션 훅을 사용하여 현재 페이지의 게시글 관리
//   const {
//     currentItems: currentPosts,
//     currentPage,
//     totalPages,
//     startButtonIndex,
//     maxButtonsToShow,
//     nextPage,
//     prevPage,
//     goToPage,
//   } = usePagination(posts || [], 5);

//   // 게시글 삭제 핸들러
//   const handleDeletePost = async (postId: string) => {
//     if (!userId) return;
//     try {
//       await deleteMutation.mutateAsync({ commentId: postId, userId });
//       // 삭제 후 쿼리 무효화 (필요시)
//       // queryClient.invalidateQueries(["myPosts", userId]);
//     } catch (error) {
//       console.error("게시글 삭제 중 오류가 발생했습니다:", error);
//     }
//   };

//   // 로딩 및 에러 처리
//   if (isLoading) return <p>로딩중...</p>;
//   if (error) return <p>에러가 발생했습니다: {error.message}</p>;

//   return (
//     <div className="container mx-auto p-4">
//       {currentPosts.length > 0 ? (
//         currentPosts.map((post) => (
//           <MyWritingCard
//             key={post.id}
//             post={post}
//             onDelete={handleDeletePost}
//           />
//         ))
//       ) : (
//         <p>작성한 게시글이 없습니다.</p>
//       )}

//       {/* 페이지네이션 UI */}
//       <div className="mt-4 flex items-center justify-center">
//         <button
//           onClick={prevPage}
//           disabled={currentPage === 1}
//           className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
//             currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
//           }`}
//         >
//           &lt;
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
//             {startButtonIndex + index + 1}
//           </button>
//         ))}

//         <button
//           onClick={nextPage}
//           disabled={currentPage === totalPages}
//           className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
//             currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
//           }`}
//         >
//           &gt;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyWritingList;











// // "use client";

// // import { getId } from "@/app/honeytips/_utils/auth"; // 사용자 ID 가져오기
// // import { useEffect, useState } from "react";
// // import { MyfetchWritingPostsData } from "@/app/mypage/_utils/MyfetchWritingPostsData"; // 작성한 게시글 데이터 가져오는 함수 임포트
// // // MyPostCard 컴포넌트 임포트
// // // Post 타입 임포트
// // import { deletePost } from "@/app/honeytips/_utils/detail"; // 게시글 삭제 API 함수 임포트
// // import usePagination from "@/hooks/usePagination"; // 페이지네이션 훅 임포트
// // import MyWritingCard from "./MyWritingCard";
// // import { Post } from "@/app/honeytips/_types/honeytips.type";

// // const MyWritingList = () => {
// //   const [posts, setPosts] = useState<Post[]>([]); // 게시글 상태 관리
// //   const [isLoading, setIsLoading] = useState(true); // 로딩 상태

// //   const loadPosts = async () => {
// //     try {
// //       const userId = await getId(); // 사용자 ID 가져오기
// //       if (!userId) {
// //         console.error("User not logged in");
// //         return;
// //       }
// //       const data = await MyfetchWritingPostsData(userId); // 작성한 게시글 데이터 로드
// //       setPosts(data as Post[]); // 상태 업데이트
// //     } catch (error) {
// //       console.error("게시글 불러오기에 실패했습니다:", error);
// //     } finally {
// //       setIsLoading(false); // 로딩 완료
// //     }
// //   };

// //   const handleDeletePost = async (postId: string) => {
// //     try {
// //       await deletePost(postId); // 게시글 삭제 요청
// //       loadPosts(); // 삭제 후 다시 로드
// //     } catch (error) {
// //       console.error("게시글 삭제 중 오류가 발생했습니다:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     loadPosts(); // 컴포넌트 마운트 시 게시글 로드
// //   }, []);

// //   const {
// //     currentItems: currentPosts,
// //     currentPage,
// //     totalPages,
// //     startButtonIndex,
// //     maxButtonsToShow,
// //     nextPage,
// //     prevPage,
// //     goToPage,
// //   } = usePagination(posts, 5); // 페이지네이션 훅 사용 (페이지당 5개 게시글)

// //   if (isLoading) {
// //     return <p>로딩중...</p>; // 로딩 중 표시
// //   }

// //   return (
// //     <div className="container mx-auto p-4">
// //       {currentPosts.length > 0 ? (
// //         currentPosts.map((post) => (
// //           <MyWritingCard
// //             key={post.id}
// //             post={post}
// //             onDelete={handleDeletePost}
// //           /> // 각 게시글 카드 표시
// //         ))
// //       ) : (
// //         <p>작성한 게시글이 없습니다.</p> // 게시글이 없을 경우 메시지 표시
// //       )}

// //       {/* 페이지네이션 UI */}
// //       <div className="mt-4 flex items-center justify-center">
// //         <button
// //           onClick={prevPage}
// //           disabled={currentPage === 1}
// //           className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
// //         >
// //           &lt; {/* 이전 페이지 버튼 */}
// //         </button>

// //         {Array.from({
// //           length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
// //         }).map((_, index) => (
// //           <button
// //             key={startButtonIndex + index}
// //             onClick={() => goToPage(startButtonIndex + index + 1)}
// //             className={`mx-1 rounded px-3 py-2 ${currentPage === startButtonIndex + index + 1 ? "bg-blue-600 text-white" : "bg-gray-300 text-black"} hover:bg-blue-500`}
// //           >
// //             {startButtonIndex + index + 1} {/* 페이지 번호 */}
// //           </button>
// //         ))}

// //         <button
// //           onClick={nextPage}
// //           disabled={currentPage === totalPages}
// //           className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
// //         >
// //           &gt; {/* 다음 페이지 버튼 */}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyWritingList;
