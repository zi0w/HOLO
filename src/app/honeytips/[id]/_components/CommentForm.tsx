"use client";

import { useAddCommentMutation } from "@/app/honeytips/[id]/_hooks/useCommentMutaion";
import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import Arrow from "@/assets/images/honeytips/arrow-up-circle.svg";
import { useRef } from "react";

type CommentFormProps = {
  postDetailData: Post;
};

const CommentForm = ({ postDetailData }: CommentFormProps) => {
  const postId = postDetailData.id;
  const inputRef = useRef<HTMLInputElement>(null);
  const isAuthenticated = useAuth();
  const addCommentMutation = useAddCommentMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      const newComment = inputRef.current.value;
      addCommentMutation.mutate({ comment: newComment, postId });
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="mx-auto mb-4 flex w-[362px] flex-col">
      <form
        onSubmit={handleSubmit}
        className="mt-1 flex items-center justify-center rounded"
      >
        <div className="relative w-full">
          <input
            className="mx-auto h-[40px] w-[362px] flex-grow rounded py-1 pl-2 pr-12 text-sm"
            type="text"
            placeholder={
              isAuthenticated ? "댓글을 입력해주세요." : "로그인이 필요합니다."
            }
            ref={inputRef}
            disabled={!isAuthenticated}
          />
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 transform px-1 text-3xl disabled:bg-base-400 hover:disabled:cursor-not-allowed"
            type="submit"
            disabled={!isAuthenticated}
          >
            <Arrow />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
