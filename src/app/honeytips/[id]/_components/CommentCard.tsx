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
import { PiDotsThreeCircleLight } from "react-icons/pi";

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
    setIsDropdownOpen(false); // 모달 닫기
  };

  const handleCommentDelete = (id: string) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) return;
    deleteCommentMutation.mutate(id);
    setIsDropdownOpen(false); // 모달 닫기
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
              <p className="text-sm font-bold text-gray-800">
                {comment.users.nickname}
              </p>
              <p className="text-xs text-gray-500">
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
              <p className=" mt-1 text-sm text-gray-800">{comment.comment}</p>
            )}
          </div>
        </div>
        {currentId && currentId === comment.user_id && (
          <div className="relative">
            <button
              className="rounded-full text-2xl text-gray-500"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <PiDotsThreeCircleLight />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 bottom-8 z-10 w-16 rounded-lg border bg-white">
                {editingCommentId === comment.id ? (
                  <>
                    <button
                      className="block w-full px-2 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                      onClick={() => handleCommentSave(comment.id)}
                    >
                      저장
                    </button>
                    <button
                      className="block w-full px-2 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
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
                      className="block w-full px-2 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedComment(comment.comment);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="block w-full px-2 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
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
