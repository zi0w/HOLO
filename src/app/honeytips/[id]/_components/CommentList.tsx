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
  // useParams로 id 받기
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

  if (isPending || isError) {
    return (
      <div className="mx-auto flex h-[200px] items-center justify-center">
        <p className="text-center">
          {isPending ? "로딩중..." : "에러가 발생했습니다."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-5 mt-[14px] flex flex-col">
      <p className="border-b font-bold text-base-800 border-base-400 pb-2">
        댓글 {comments?.length || 0}
      </p>
      <section className="my-5 flex flex-col items-center justify-center gap-3 rounded">
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
    </div>
  );
};

export default CommentList;
