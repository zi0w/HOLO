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
    <article className="mx-auto w-full rounded-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {comment.users?.profile_image_url && (
            <Image
              className="h-[42px] w-[42px] rounded-full border-2 bg-white"
              src={comment.users.profile_image_url}
              alt="프로필 이미지"
              width={100}
              height={100}
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-800 font-bold">{comment.users.nickname}</p>
              <p className="text-xs text-gray-500">
                {formatDate(comment.created_at)}
              </p>
            </div>
            <p className="text-sm text-gray-800">{comment.comment}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {currentId &&
          currentId === comment.user_id &&
          editingCommentId === comment.id ? (
            <>
              <button
                className="rounded-lg text-sm px-2 py-1 border text-base-500"
                type="button"
                onClick={() => handleCommentSave(comment.id)}
              >
                저장
              </button>
              <button
                className="rounded-lg text-sm px-2 py-1 border text-base-500"
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
                className="rounded-lg text-sm px-2 py-1 border text-base-500"
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
              className="rounded-lg text-sm px-2 py-1 border text-base-500"
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
      ) : null}
    </article>
  );
};

export default CommentCard;
