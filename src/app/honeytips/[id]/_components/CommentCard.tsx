"use client";

import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/app/honeytips/[id]/_hooks/useCommentMutaion";
import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import MenuDots from "@/assets/images/honeytips/more-horizontal.svg";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const updateCommentMutation = useUpdateCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();

  const formatDate = (date: string) => {
    const now = dayjs();
    const createdAt = dayjs(date);

    if (now.diff(createdAt, "hour") < 24) {
      return createdAt.fromNow();
    }
    return createdAt.format("YY.MM.DD");
  };

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
    setIsDropdownOpen(false);
  };

  const handleCommentDelete = (id: string) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) return;
    deleteCommentMutation.mutate(id);
    setIsDropdownOpen(false);
  };

  return (
    <article className="mx-5 w-full rounded-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-[14px]">
          {comment.users.profile_image_url && (
            <Image
              className="h-[50px] w-[50px] rounded-full"
              src={comment.users.profile_image_url}
              alt="프로필 이미지"
              width={100}
              height={100}
            />
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[14px] font-bold text-base-800">
                {comment.users.nickname}
              </p>
              <p className="text-[14px] text-base-500">
                {formatDate(comment.created_at)}
              </p>
            </div>
            {editingCommentId === comment.id ? (
              <input
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="w-[250px] rounded-lg border p-1 text-sm"
                placeholder="댓글을 수정하세요."
              />
            ) : (
              <p className="mt-1 text-[14px] text-base-800">
                {comment.comment}
              </p>
            )}
          </div>
        </div>
        {currentId && currentId === comment.user_id && (
          <div className="relative">
            <button
              className="rounded-full text-gray-500"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <MenuDots />
            </button>
            {isDropdownOpen && (
              <div className="absolute bottom-[31px] right-0 z-10 w-[68px] rounded-lg border bg-white py-2">
                {editingCommentId === comment.id ? (
                  <>
                    <button
                      className="block w-full px-5 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                      onClick={() => handleCommentSave(comment.id)}
                    >
                      저장
                    </button>
                    <button
                      className="block w-full px-5 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                      onClick={() => {
                        setEditingCommentId(null);
                        setIsDropdownOpen(false);
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="block w-full px-5 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedComment(comment.comment);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="block w-full px-5 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                      onClick={() => handleCommentDelete(comment.id)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default CommentCard;
