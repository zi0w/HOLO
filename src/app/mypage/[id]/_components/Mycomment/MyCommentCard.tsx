"use client";

import { Comment } from "@/app/honeytips/_types/honeytips.type"; // Comment 타입 가져오기
import Image from "next/image"; // Next.js의 Image 컴포넌트 가져오기
import Link from "next/link"; // Next.js의 Link 컴포넌트 가져오기

type MyCommentCardProps = {
  comment: Comment; // 댓글 데이터
  onDelete: (commentId: string) => void; // 삭제 핸들러
  onEdit: (commentId: string, newContent: string) => void; // 수정 핸들러
};

const MyCommentCard = ({ comment, onDelete, onEdit }: MyCommentCardProps) => {
  const handleEdit = () => {
    const newContent = prompt("댓글을 수정하세요:", comment.comment);
    if (newContent) {
      onEdit(comment.id, newContent); // 수정 핸들러 호출
    }
  };

  return (
    <Link
      href={`/honeytips/${comment.post_id}`}
      className="mb-4 block rounded-lg border p-4 shadow-md hover:bg-gray-100"
    >
      <div className="flex items-center">
        {comment.users?.profile_image_url ? (
          <Image
            src={comment.users.profile_image_url}
            alt={`${comment.users.nickname || "사용자"}의 프로필 이미지`}
            width={40}
            height={40}
            className="rounded-full" // 동그란 이미지 스타일
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
            <span className="text-gray-500">N/A</span>
          </div>
        )}
        <span className="ml-2 font-bold">
          {comment.users?.nickname || "사용자"}
        </span>
      </div>
      <p className={`mt-2 line-clamp-2`}>
        {comment.comment} {/* 댓글 내용 */}
      </p>
      <div className="mt-2 flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation(); // 링크 클릭 이벤트가 발생하지 않도록 방지
            onDelete(comment.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          삭제
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation(); // 링크 클릭 이벤트가 발생하지 않도록 방지
            handleEdit();
          }}
          className="ml-2 text-blue-500 hover:text-blue-700"
        >
          수정
        </button>
      </div>
    </Link>
  );
};

export default MyCommentCard;

// "use client";

// import { Comment } from "@/app/honeytips/_types/honeytips.type"; // Comment 타입 가져오기
// import Image from "next/image"; // Next.js의 Image 컴포넌트 가져오기

// type CommentCardProps = {
//   comment: Comment; // 댓글 데이터
//   onDelete: (commentId: string) => void; // 삭제 핸들러
//   onEdit: (commentId: string, newContent: string) => void; // 수정 핸들러
// };

// const MyCommentCard = ({ comment, onDelete, onEdit }: CommentCardProps) => {
//   const handleEdit = () => {
//     const newContent = prompt("댓글을 수정하세요:", comment.comment);
//     if (newContent) {
//       onEdit(comment.id, newContent); // 수정 핸들러 호출
//     }
//   };

//   return (
//     <div className="mb-4 rounded-lg border p-4 shadow-md">
//       <div className="flex items-center">
//         <Image
//           src={comment.users?.profile_image_url || "/default-profile.png"} // 기본 프로필 이미지 경로 설정
//           alt={`${comment.users?.nickname || "사용자"}의 프로필 이미지`} // 사용자 이름이 없을 경우 기본값 설정
//           width={40}
//           height={40}
//           className="rounded-full"
//         />
//         <span className="ml-2 font-bold">{comment.users?.nickname || "사용자"}</span> {/* 기본 사용자 이름 설정 */}
//       </div>
//       <p className={`mt-2 line-clamp-2`}>{comment.comment}</p> {/* 댓글 내용 */}

//       <div className="mt-2 flex justify-end">
//         <button
//           onClick={() => onDelete(comment.id)}
//           className="text-red-500 hover:text-red-700"
//         >
//           삭제
//         </button>
//         <button
//           onClick={handleEdit}
//           className="ml-2 text-blue-500 hover:text-blue-700"
//         >
//           수정
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyCommentCard;
