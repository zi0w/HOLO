"use client";

import RemoveModal from "@/app/mypage/_components/RemoveModal";
import type { CommentWithPost } from "@/app/mypage/_types/useMyTypes";
import useCommentModalStore from "@/store/mypagemodal/useCommentModalStore";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

type MyCommentCardProps = {
  comment: CommentWithPost;
  onDelete: (commentId: string) => void;
};

const MyCommentCard: FC<MyCommentCardProps> = ({ comment, onDelete }) => {
  const { isCommentModalOpen, openCommentModal, closeCommentModal } =
    useCommentModalStore();

  const handleDelete = async () => {
    try {
      await onDelete(comment.id);
      closeCommentModal();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex h-[64px] w-full items-center justify-between px-5",
        )}
      >
        <Link
          href={`/honeytips/${comment.post_id}`}
          className={clsx("flex flex-1 items-center gap-3")}
        >
          {comment.posts?.post_image_url &&
          comment.posts.post_image_url.length > 0 ? (
            <div
              className={clsx(
                "relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[4px]",
              )}
            >
              <Image
                src={comment.posts.post_image_url[0]}
                alt={`게시글 이미지`}
                fill
                className={clsx("object-cover")}
                priority
              />
            </div>
          ) : (
            <div className={clsx("h-[48px] w-[48px] shrink-0")} />
          )}
          <div className={clsx("flex min-w-0 flex-1 flex-col gap-[2px]")}>
            <div className={clsx("flex w-full items-center justify-between")}>
              <h3
                className={clsx(
                  "line-clamp-1 text-[16px] font-medium text-base-800",
                )}
              >
                {comment.posts?.title}
              </h3>
              <span
                className={clsx("-mt-[5px] ml-2 text-[14px] text-base-500")}
              >
                {new Date(comment.created_at)
                  .toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\. /g, ".")
                  .slice(0, -1)}
              </span>
            </div>
            <p className={clsx("line-clamp-1 text-[14px] text-base-800")}>
              {comment.comment}
            </p>
          </div>
        </Link>
        <div className={clsx("ml-4 flex items-center")}>
          <button
            onClick={(e) => {
              e.preventDefault();
              openCommentModal();
            }}
            className="flex h-[28px] w-[38px] items-center justify-center border border-base-800 px-[7px] py-[6px] text-[12px] text-base-800"
          >
            삭제
          </button>
        </div>
      </div>

      <RemoveModal
        isOpen={isCommentModalOpen}
        text="댓글 을 삭제"
        onAction={handleDelete}
        onClose={closeCommentModal}
      />
    </>
  );
};

export default MyCommentCard;

// "use client";

// import RemoveModal from "@/app/mypage/_components/RemoveModal";
// import type { CommentWithPost } from "@/app/mypage/_types/useMyTypes";
// import clsx from "clsx";
// import Image from "next/image";
// import Link from "next/link";
// import { type FC } from "react";
// import useCommentModalStore from "@/store/mypagemodal/useCommentModalStore";

// type MyCommentCardProps = {
//   comment: CommentWithPost;
//   onDelete: (commentId: string) => void;
// };

// const MyCommentCard: FC<MyCommentCardProps> = ({ comment, onDelete }) => {
//   const {
//     isCommentModalOpen,
//     isCommentConfirm,
//     setIsCommentModalOpen,
//     setIsCommentConfirm,
//   } = useCommentModalStore();

//   const handleDelete = async () => {
//     try {
//       await onDelete(comment.id);
//       setIsCommentConfirm(false); // 완료 후 상태 초기화
//       setIsCommentModalOpen(true); // 완료 모달 열기
//     } catch (error) {
//       console.error("댓글 삭제 실패:", error);
//     }
//   };

//   const handleClose = () => {
//     setIsCommentModalOpen(false);
//     setIsCommentConfirm(false); // 상태 초기화
//   };

//   return (
//     <>
//       <div
//         className={clsx(
//           "flex h-[64px] w-full items-center justify-between px-5",
//         )}
//       >
//         <Link
//           href={`/honeytips/${comment.post_id}`}
//           className={clsx("flex flex-1 items-center gap-3")}
//         >
//           {comment.posts?.post_image_url &&
//           comment.posts.post_image_url.length > 0 ? (
//             <div
//               className={clsx(
//                 "relative h-[48px] w-[48px] shrink-0 overflow-hidden rounded-[4px]",
//               )}
//             >
//               <Image
//                 src={comment.posts.post_image_url[0]}
//                 alt={`게시글 이미지`}
//                 fill
//                 className={clsx("object-cover")}
//                 priority
//               />
//             </div>
//           ) : (
//             <div className={clsx("h-[48px] w-[48px] shrink-0")} />
//           )}
//           <div className={clsx("flex min-w-0 flex-1 flex-col gap-[2px]")}>
//             <div className={clsx("flex w-full items-center justify-between")}>
//               <h3
//                 className={clsx(
//                   "line-clamp-1 text-[16px] font-medium text-base-800",
//                 )}
//               >
//                 {comment.posts?.title}
//               </h3>
//               <span
//                 className={clsx("-mt-[5px] ml-2 text-[14px] text-base-500")}
//               >
//                 {new Date(comment.created_at)
//                   .toLocaleDateString("ko-KR", {
//                     year: "numeric",
//                     month: "2-digit",
//                     day: "2-digit",
//                   })
//                   .replace(/\. /g, ".")
//                   .slice(0, -1)}
//               </span>
//             </div>
//             <p className={clsx("line-clamp-1 text-[14px] text-base-800")}>
//               {comment.comment}
//             </p>
//           </div>
//         </Link>
//         <div className={clsx("ml-4 flex items-center")}>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               setIsCommentConfirm(true);
//               setIsCommentModalOpen(true);
//             }}
//             className="flex h-[28px] w-[38px] items-center justify-center border border-base-800 px-[7px] py-[6px] text-[12px] text-base-800"
//           >
//             삭제
//           </button>
//         </div>
//       </div>

//       <RemoveModal
//         isOpen={isCommentModalOpen}
//         isConfirm={isCommentConfirm}
//         text="댓글"
//         onAction={handleDelete}
//         onClose={handleClose}
//       />
//     </>
//   );
// };

// export default MyCommentCard;
