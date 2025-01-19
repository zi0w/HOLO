// components/MyCommentList.tsx
"use client";

import { useComments } from "@/app/mypage/[id]/_components/Mycomment/hooks/useComments";
import MyCommentCard from "./MyCommentCard";
import type { CommentWithPost } from "@/app/mypage/[id]/_components/_type/comment";


const MyCommentList = () => {
  const { comments, isLoading, handleDelete } = useComments();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="container mx-auto p-4">
      {comments?.map((comment: CommentWithPost) => (
        <MyCommentCard
          key={comment.id}
          comment={comment}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MyCommentList;