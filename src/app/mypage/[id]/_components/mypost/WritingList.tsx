"use client";

import { useMyPosts } from "@/app/mypage/[id]/_components/mypost/_hooks/useMyWriting";
import MyWritingCard from "@/app/mypage/[id]/_components/mypost/WritingCard";
import type { Post } from "@/app/mypage/_types/myPage";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

const MyWritingList = () => {
  const { posts, isLoading, handleDelete, isDeleting } = useMyPosts();

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination<Post>(posts, 5);

  if (isLoading) return <p>로딩중입니다...</p>;

  return (
    <div className="h-full w-full pt-[10px]">
      {currentPosts.length > 0 ? (
        <div className="relative flex h-full flex-col">
          <div className="flex-1">
            {currentPosts.map((post) => (
              <MyWritingCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                isDeleting={isDeleting(post.id)}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white px-[86px] py-4 pr-[90px]">
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
        </div>
      ) : (
        <p className="py-4 text-center text-[#8F8F8F]">
          작성한 게시물이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyWritingList;
// "use client";

// import Link from "next/link";
// import type { Post } from "@/app/mypage/_types/myPage";

// import ConfirmModal from "@/app/mypage/_components/ConfirmModal";
// import { useState } from "react";
// import { formatDate } from "@/app/honeytips/_utils/formatDate";

// export type WritingCardProps = {
//   post: Post;
//   onDelete: (postId: string) => Promise<void>;
//   isDeleting: boolean;
// };

// const MyWritingCard = ({ post, onDelete, isDeleting }: WritingCardProps) => {
//   const [showModal, setShowModal] = useState(false);

//   const handleDelete = async () => {
//     try {
//       await onDelete(post.id);
//       setShowModal(false);
//     } catch (error) {
//       console.error("게시글 삭제 중 오류:", error);
//     }
//   };

//   return (
//     <>
//       <div className="mb-4 flex w-full items-center justify-between rounded-[10px] border border-[#E6E6E6] px-6 py-4">
//         <Link
//           href={`/honeytips/${post.id}`}
//           className="flex flex-1 items-center gap-4"
//         >
//           <div className="flex-1">
//             <h3 className="mb-2 text-lg font-bold">{post.title}</h3>
//             <p className="text-sm text-gray-600">
//               {formatDate(post.created_at)}
//             </p>
//           </div>
//         </Link>
//         <button
//           onClick={() => setShowModal(true)}
//           disabled={isDeleting}
//           className="ml-4 rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:bg-gray-400"
//         >
//           {isDeleting ? "삭제 중..." : "삭제"}
//         </button>
//       </div>
//       <ConfirmModal
//         isOpen={showModal}
//         text="정말 삭제하시겠습니까?"
//         isConfirm={true}
//         onAction={handleDelete}
//         onClose={() => setShowModal(false)}
//       />
//     </>
//   );
// };

// export default MyWritingCard;


