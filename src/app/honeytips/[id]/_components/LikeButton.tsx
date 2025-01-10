"use client";

import { useLikeMutation } from "@/app/honeytips/[id]/_hooks/useLikeMutation";
import { useLikeDataQuery } from "@/app/honeytips/[id]/_hooks/useLikeQuery";
import type { Like } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ postId }: { postId: Like["post_id"] }) => {
  const { data, isError, isPending } = useLikeDataQuery(postId);
  const likeMutation = useLikeMutation(postId);

  const handleLikeBtn = async () => {
    const userId: Like["user_id"] | null = await getId();

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (data!.length > 0) {
      const isConfirmed = window.confirm("정말 취소하시겠습니까?");
      if (!isConfirmed) return;

      likeMutation.mutate({ action: "delete", userId, postId });
    } else {
      likeMutation.mutate({ action: "add", userId, postId });
    }
  };

  if (isPending) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className="flex text-2xl">
      <button onClick={handleLikeBtn}>
        {data?.length ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default LikeButton;
