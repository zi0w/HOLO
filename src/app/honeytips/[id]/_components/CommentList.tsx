"use client";

import {
  useDeleteComment,
  useUpdateComment,
} from "@/app/honeytips/[id]/_hooks/useCommentMutaion";
import useCommentData from "@/app/honeytips/[id]/_hooks/useCommentQuery";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type CommentListProps = {
  data: Post;
};

const CommentList = ({ data }: CommentListProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>("");
  const [currentId, setCurrentId] = useState<string | null>(null);

  const postId = data.id;

  const { data: comments, isError, isPending } = useCommentData(postId);
  const updateMutation = useUpdateComment();
  const deleteMutation = useDeleteComment();

  useEffect(() => {
    const fetchUserId = async () => {
      // const userId = await getId();
      const userId = "9826a705-38ce-4a07-b0dc-cbfb251355e3";
      setCurrentId(userId);
    };
    fetchUserId();
  }, []);

  const handleSave = (id: string) => {
    if (!editedComment.trim()) {
      alert("내용을 입력해주세요");
      return;
    }
    updateMutation.mutate({
      editingComment: editedComment,
      editingId: id,
      postId,
    });
    setEditingCommentId(null);
  };

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) return;
    deleteMutation.mutate(id);
  };

  const formatDate = (date: string) => {
    const now = dayjs();
    const createdAt = dayjs(date);

    if (now.diff(createdAt, "hour") < 24) {
      return createdAt.fromNow();
    }
    return createdAt.format("YY.MM.DD");
  };

  if (isPending) return <>로딩중...</>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="mx-auto mt-6 flex w-[380px] flex-col items-center justify-center gap-4 rounded bg-gray-100 p-4">
      {comments?.length === 0 ? (
        <p className="text-gray-400 text-sm">입력된 댓글이 없습니다.</p>
      ) : (
        comments?.map((comment) => (
          <div
            key={comment.id}
            className="mx-auto w-full max-w-[380px] rounded-lg bg-white p-4 shadow-lg transition duration-300 ease-in-out hover:shadow-xl"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  className="h-10 w-10 rounded-full border-2"
                  src={
                    comment.users.profile_image_url ||
                    "https://via.placeholder.com/50x50"
                  }
                  alt="프로필 이미지"
                  width={100}
                  height={100}
                />
                <div>
                  <p className="font-semibold">{comment.users.nickname}</p>
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
                      onClick={() => handleSave(comment.id)}
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
                    onClick={() => handleDelete(comment.id)}
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
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
