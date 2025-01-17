"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image"; // Next.js의 Image 컴포넌트 가져오기
import Link from "next/link"; // Link 컴포넌트 가져오기
import { useState } from "react"; // 상태 관리

dayjs.extend(relativeTime);

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  post_image_url?: string[] | null; // 게시글 이미지 URL 배열 추가
};

type MyWritingCardProps = {
  post: Post; // 게시물 데이터
  onDelete: (postId: string) => void; // 삭제 핸들러
};

const MyWritingCard = ({ post, onDelete }: MyWritingCardProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false); // 내용 표시 여부

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible); // 내용 표시 상태 토글
  };

  return (
    <div className="mb-4 rounded-lg border p-4 shadow-md">
      <Link href={`/honeytips/${post.id}`} className="flex h-full flex-col">
        <div className="flex items-start">
          {/* 게시글 첫 번째 이미지 */}
          {post.post_image_url && post.post_image_url.length > 0 && (
            <Image
              src={post.post_image_url[0]} // 첫 번째 이미지 URL 사용
              alt={`게시글 이미지`}
              width={120} // 원하는 너비 설정
              height={120} // 세로 길이 증가 (길게 설정)
              className="rounded-lg object-cover mr-4" // 스타일 조정
            />
          )}
          <div className="flex-grow"> {/* 제목과 내용이 들어갈 부분 */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-600 hover:underline">
                {post.title} {/* 게시물 제목 */}
              </h3>
              {/* 삭제 버튼 */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(post.id); // 삭제 버튼 클릭 시 호출
                }}
                className="text-red-500 hover:text-red-700"
              >
                삭제
              </button>
            </div>

            <p className="text-xs text-gray-500">
              {dayjs(post.created_at).fromNow()} {/* 생성 날짜를 상대 시간으로 표시 */}
            </p>

            {/* 게시글 내용 */}
            <p className={`mt-2 ${isContentVisible ? "" : "line-clamp-2"}`}>
              {post.content}
            </p>
          </div>
        </div>
      </Link>

      {/* 더보기/숨기기 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleContentVisibility(); // 내용 표시 상태 토글
        }}
        className="mt-2 text-blue-500"
      >
        {isContentVisible ? "숨기기" : "더보기"} {/* 현재 상태에 따라 버튼 텍스트 변경 */}
      </button>
    </div>
  );
};

export default MyWritingCard;
















// "use client";

// import type { Post } from "@/app/honeytips/_types/honeytips.type"; // Post 타입 임포트
// import Image from "next/image";
// import Link from "next/link";

// type MyWritingCardProps = {
//   post: Post; // 게시글 데이터
//   onDelete: (postId: string) => void; // 삭제 핸들러
// };

// const MyWritingCard = ({ post, onDelete }: MyWritingCardProps) => {
//   return (
//     <div className="mb-4 block rounded-lg border p-4 shadow-md hover:bg-gray-100">
//       <Link href={`/honeytips/${post.id}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             {post.users?.profile_image_url ? (
//               <Image
//                 src={post.users.profile_image_url}
//                 alt={`${post.users.nickname || "작성자"}의 프로필 이미지`}
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//             ) : (
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
//                 <span className="text-gray-500">N/A</span>
//               </div>
//             )}
//             <span className="ml-2 font-bold">
//               {post.users.nickname || "작성자"}
//             </span>
//           </div>
//         </div>
//         <h4 className="mt-2 font-semibold">{post.title}</h4>
//         <p className="mt-2 line-clamp-2">{post.content}</p>
//       </Link>
//       <div className="mt-2 flex justify-end">
//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             onDelete(post.id); // 삭제 버튼 클릭 시 onDelete 호출
//           }}
//           className="text-red-500 hover:text-red-700"
//         >
//           삭제
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyWritingCard;
