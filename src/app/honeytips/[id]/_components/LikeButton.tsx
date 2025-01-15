"use client";

import { useLikeMutation } from "@/app/honeytips/[id]/_hooks/useLikeMutation";
import { useLikeDataQuery } from "@/app/honeytips/[id]/_hooks/useLikeQuery";
import type { Like, Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import YesHeart from "@/assets/images/honeytips/love_selected_42.svg";
import NoHeart from "@/assets/images/honeytips/love_unselected_42.svg";
import { useState } from "react";

type LikeButtonProps = {
  postDetailData: Post;
};

const LikeButton = ({ postDetailData }: LikeButtonProps) => {
  const postId = postDetailData.id;
  const { data: likeData, isError, isPending } = useLikeDataQuery(postId);
  const [likesCounts, setLikesCounts] = useState(
    postDetailData.likes[0].count || 0,
  );
  const [mutating, setMutating] = useState(false);
  const likeMutation = useLikeMutation(postId);

  const handleLikeBtn = async () => {
    const userId: Like["user_id"] | null = await getId();

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    setMutating(true);

    if (likeData!.length > 0) {
      likeMutation.mutate(
        { action: "delete", userId, postId },
        {
          onSuccess: () => {
            setLikesCounts((prev) => prev - 1);
            setMutating(false);
          },
          onError: () => {
            setMutating(false);
          },
        },
      );
    } else {
      likeMutation.mutate(
        { action: "add", userId, postId },
        {
          onSuccess: () => {
            setLikesCounts((prev) => prev + 1);
            setMutating(false);
          },
          onError: () => {
            setMutating(false);
          },
        },
      );
    }
  };

  if (isPending) return <p>로딩중...</p>;

  if (isError) return <p>에러가 발생했습니다.</p>;

  return (
    <section className="flex flex-col items-center text-2xl">
      <button onClick={handleLikeBtn} disabled={mutating} >
        {likeData?.length ? <YesHeart /> : <NoHeart />}
      </button>
      <p className="text-sm mt-1 text-primary-500">{likesCounts}</p>
    </section>
  );
};

export default LikeButton;
