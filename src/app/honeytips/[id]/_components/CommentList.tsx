"use client";

import CommentCard from "@/app/honeytips/[id]/_components/CommentCard";
import { useCommentDataQuery } from "@/app/honeytips/[id]/_hooks/useCommentQuery";
import type { Comment, Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";

type CommentListProps = {
  postDetailData: Post;
};

const CommentList = ({ postDetailData }: CommentListProps) => {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const postId: Comment["post_id"] = postDetailData.id;

  const { data: comments, isError, isPending } = useCommentDataQuery(postId);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getId();

      setCurrentId(userId);
    };
    fetchUserId();
  }, []);

  if (isPending) return <p>로딩중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  return (
    <section className="mx-auto my-6 flex w-[380px] flex-col items-center justify-center gap-4 rounded bg-gray-100 p-4">
      {comments?.length === 0 ? (
        <p className="text-sm text-gray-400">입력된 댓글이 없습니다.</p>
      ) : (
        comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            currentId={currentId}
            postId={postId}
          />
        ))
      )}
    </section>
  );
};

export default CommentList;
