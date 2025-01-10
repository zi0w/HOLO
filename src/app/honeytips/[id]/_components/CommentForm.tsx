"use client";

import { useRef } from "react";
// import useAuth from "../../_hooks/useHoneytipsAuth";
import { useAddCommentMutation } from "@/app/honeytips/[id]/_hooks/useCommentMutaion";
import useAuth from "@/app/honeytips/_hooks/useHoneytipsAuth";
import type { Post } from "@/app/honeytips/_types/honeytips.type";

type CommentFormProps = {
  data: Post;
};

const CommentForm = ({ data }: CommentFormProps) => {
  const postId = data.id;
  const inputRef = useRef<HTMLInputElement>(null);
  const isAuthenticated = useAuth();
  const addMutation = useAddCommentMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value !== "") {
      const newComment = inputRef.current.value;
      addMutation.mutate({ comment: newComment, postId });
      inputRef.current!.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-4 flex w-[380px] items-center justify-center rounded bg-gray-100 p-4"
    >
      <input
        className="mr-4 flex-grow rounded px-2 py-1 text-sm"
        type="text"
        placeholder={
          isAuthenticated ? "댓글을 입력해주세요." : "로그인이 필요합니다."
        }
        ref={inputRef}
        disabled={!isAuthenticated}
      />
      <button
        className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        type="submit"
        disabled={!isAuthenticated}
      >
        저장
      </button>
    </form>
  );
};

export default CommentForm;
