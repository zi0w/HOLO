"use client";

import type { CommentWithPost } from "@/app/mypage/_types/CommentWithPost";
import Image from "next/image";
import Link from "next/link";


// type User = {
//   nickname: string;
//   profile_image_url: string | null;
// };

// type Post = {
//   title: string;
//   users: User;
// };

// type CommentWithPost = {
//   id: string;
//   comment: string;
//   created_at: string;
//   users: User;
//   posts: Post;
//   post_id: string;
// };

type CommentCardProps = {
  comment: CommentWithPost;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
};

const MyCommentCard = ({ comment, onDelete, onEdit }: CommentCardProps) => {
  const handleEdit = () => {
    const newContent = prompt("댓글을 수정하세요:", comment.comment);
    if (newContent) {
      onEdit(comment.id, newContent);
    }
  };

  return (
    <div className="mb-4 block rounded-lg border p-4 shadow-md hover:bg-gray-100">
      <Link href={`/honeytips/${comment.post_id}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {comment.posts.users?.profile_image_url ? (
              <Image
                src={comment.posts.users.profile_image_url}
                alt={`${comment.posts.users.nickname || "게시글 작성자"}의 프로필 이미지`}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                <span className="text-gray-500">N/A</span>
              </div>
            )}
            <span className="ml-2 font-bold">
              {comment.posts.users?.nickname || "게시글 작성자"}
            </span>
          </div>
        </div>
        <h4 className="mt-2 font-semibold">{comment.posts.title}</h4>
        <p className="mt-2 line-clamp-2">{comment.comment}</p>
      </Link>
      <div className="mt-2 flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(comment.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          삭제
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleEdit();
          }}
          className="ml-2 text-blue-500 hover:text-blue-700"
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default MyCommentCard;




























