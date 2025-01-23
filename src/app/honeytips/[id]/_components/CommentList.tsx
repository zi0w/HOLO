"use client";

import CommentCard from "@/app/honeytips/[id]/_components/CommentCard";
import CommentForm from "@/app/honeytips/[id]/_components/CommentForm";
import CommentLoading from "@/app/honeytips/[id]/_components/CommentLoading";
import { useCommentDataQuery } from "@/app/honeytips/[id]/_hooks/useCommentQuery";
import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import "dayjs/locale/ko";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CommentList = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const params = useParams();

  const postId: Comment["post_id"] = params.id as string;

  const { data: comments, isError, isPending } = useCommentDataQuery(postId);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getId();
      setCurrentId(userId);
    };
    fetchUserId();
  }, []);

  if (isPending) return <CommentLoading />;
  if (isError) return <div>에러가 발생했습니다!</div>;

  return (
    <div className="mx-5 mt-[14px] flex flex-col">
      <p className="border-b border-base-400 pb-2 font-bold text-base-800">
        댓글 {comments.length || 0}
      </p>
      <section className="my-5 flex flex-col items-center justify-center gap-3 rounded">
        {comments.length === 0 ? (
          <p className="text-sm text-base-400">입력된 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentId={currentId}
              postId={postId}
            />
          ))
        )}
      </section>
      <CommentForm />
    </div>
  );
};

export default CommentList;
