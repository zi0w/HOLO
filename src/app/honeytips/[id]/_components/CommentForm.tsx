"use client";

import { useAddCommentMutation } from "@/app/honeytips/[id]/_hooks/useCommentMutaion";
import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import ArrowGray from "@/assets/images/honeytips/arrow-up-circle.svg";
import ArrowOrange from "@/assets/images/honeytips/comment-button.svg";
import { useParams } from "next/navigation";
import { useRef } from "react";

const CommentForm = () => {
  const params = useParams();
  const postId: Comment["post_id"] = params.id as string;

  const inputRef = useRef<HTMLInputElement>(null);
  const isAuthenticated = useAuth();
  const addCommentMutation = useAddCommentMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    const newComment = inputRef.current!.value;
    addCommentMutation.mutate({ comment: newComment, postId });
    inputRef.current!.value = "";
  };

  return (
    <div className="mb-4 flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="mt-1 flex items-center justify-center rounded"
      >
        <div className="relative w-full">
          <input
            className="h-[40px] w-full flex-grow rounded py-1 pl-2 pr-12 text-sm"
            type="text"
            placeholder={
              isAuthenticated ? "댓글을 입력해주세요." : "로그인이 필요합니다."
            }
            ref={inputRef}
            disabled={!isAuthenticated}
          />
          <button
            className="disabled: absolute right-1 top-1/2 -translate-y-1/2 transform px-1 text-3xl hover:disabled:cursor-not-allowed"
            type="submit"
            disabled={!isAuthenticated}
          >
            {isAuthenticated ? <ArrowOrange /> : <ArrowGray />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
