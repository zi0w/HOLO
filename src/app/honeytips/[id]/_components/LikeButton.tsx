"use client";

import { useLikeMutation } from "@/app/honeytips/[id]/_hooks/useLikeMutation";
import { useLikeDataQuery } from "@/app/honeytips/[id]/_hooks/useLikeQuery";
import type { Like, Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
      <button onClick={handleLikeBtn} disabled={mutating}>
        {likeData?.length ? (
          <FaHeart className="text-primary-500" />
        ) : (
          <FaRegHeart />
        )}
      </button>
      <p className="text-sm text-primary-500">{likesCounts}</p>
    </section>
  );
};

export default LikeButton;
