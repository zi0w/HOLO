"use client";

import { useLikeMutation } from "@/app/honeytips/[id]/_hooks/useLikeMutation";
import { useLikeDataQuery } from "@/app/honeytips/[id]/_hooks/useLikeQuery";
import type { Like, Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import YesHeart from "@/assets/images/honeytips/love_selected_42.svg";
import NoHeart from "@/assets/images/honeytips/love_unselected_42.svg";
import LoginModal from "@/components/common/LoginModal";
import useLoginModalStore from "@/store/loginModalStore";
import { useIsMutating } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type LikeButtonProps = {
  postId: Post["id"];
  likesCounts: number;
  setLikesCounts: React.Dispatch<React.SetStateAction<number>>;
};

const LikeButton = ({
  postId,
  likesCounts,
  setLikesCounts,
}: LikeButtonProps) => {
  const { data: likeData } = useLikeDataQuery(postId);
  const likeMutation = useLikeMutation(postId);
  const isMutating = useIsMutating();
  const router = useRouter();

  const { setIsLoginModalOpen, setIsLoginConfirm } = useLoginModalStore();

  const handleLikeBtn = async () => {
    const userId: Like["user_id"] | null = await getId();

    if (!userId) {
      setIsLoginModalOpen(true);
      setIsLoginConfirm(true);
      return;
    }

    if (likeData!.length > 0) {
      likeMutation.mutate(
        { action: "delete", userId, postId },
        {
          onSuccess: () => {
            setLikesCounts((prev) => prev - 1);
          },
        },
      );
    } else {
      likeMutation.mutate(
        { action: "add", userId, postId },
        {
          onSuccess: () => {
            setLikesCounts((prev) => prev + 1);
          },
        },
      );
    }
  };

  const handleConfirm = () => {
    setIsLoginModalOpen(false);
    router.push("/sign-in");
  };

  return (
    <section className="flex flex-col items-center text-2xl">
      <LoginModal
        text={"로그인 페이지로 이동"}
        onAction={handleConfirm}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <button onClick={handleLikeBtn} disabled={!!isMutating}>
        {likeData?.length ? <YesHeart /> : <NoHeart />}
      </button>
      <p className="text-[14px] text-primary-500">{likesCounts}</p>
    </section>
  );
};

export default LikeButton;
