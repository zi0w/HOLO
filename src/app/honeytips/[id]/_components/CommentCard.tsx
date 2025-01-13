"use client";

import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/app/honeytips/[id]/_hooks/useCommentMutaion";
import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type CommentCardProps = {
  comment: Comment;
  currentId: string | null;
  postId: Comment["post_id"];
};

const CommentCard = ({ comment, currentId, postId }: CommentCardProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>("");

  const updateCommentMutation = useUpdateCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();

  const handleCommentSave = (id: string) => {
    if (!editedComment.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    updateCommentMutation.mutate({
      editingComment: editedComment,
      editingId: id,
      postId,
    });
    setEditingCommentId(null);
  };

  const handleCommentDelete = (id: string) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) return;
    deleteCommentMutation.mutate(id);
  };

  const formatDate = (date: string) => {
    const now = dayjs();
    const createdAt = dayjs(date);

    if (now.diff(createdAt, "hour") < 24) {
      return createdAt.fromNow();
    }
    return createdAt.format("YY.MM.DD");
  };

  return (
    <article className="mx-auto w-full max-w-[380px] rounded-lg bg-white p-4 shadow-lg transition duration-300 ease-in-out hover:shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {comment.users?.profile_image_url && (
            <Image
              className="h-10 w-10 rounded-full border-2 bg-white"
              src={comment.users.profile_image_url}
              alt="프로필 이미지"
              width={100}
              height={100}
            />
          )}

          <div>
            <p className="text-sm">{comment.users.nickname}</p>
            <p className="text-xs text-gray-500">
              {formatDate(comment.created_at)}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {currentId &&
          currentId === comment.user_id &&
          editingCommentId === comment.id ? (
            <>
              <button
                className="rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                type="button"
                onClick={() => handleCommentSave(comment.id)}
              >
                저장
              </button>
              <button
                className="rounded-lg bg-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-400"
                type="button"
                onClick={() => setEditingCommentId(null)}
              >
                취소
              </button>
            </>
          ) : (
            currentId &&
            currentId === comment.user_id && (
              <button
                className="rounded-lg bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                type="button"
                onClick={() => {
                  setEditingCommentId(comment.id);
                  setEditedComment(comment.comment);
                }}
              >
                수정
              </button>
            )
          )}
          {currentId && currentId === comment.user_id && (
            <button
              className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              type="button"
              onClick={() => handleCommentDelete(comment.id)}
            >
              &times;
            </button>
          )}
        </div>
      </div>
      {editingCommentId === comment.id ? (
        <textarea
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          className="w-full resize-none rounded-lg border p-2 text-sm"
          placeholder="댓글을 수정하세요."
        />
      ) : (
        <p className="mt-2 text-sm">{comment.comment}</p>
      )}
    </article>
  );
};

export default CommentCard;
