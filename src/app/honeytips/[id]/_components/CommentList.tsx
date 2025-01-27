"use client";

import CommentCard from "@/app/honeytips/[id]/_components/CommentCard";
import CommentForm from "@/app/honeytips/[id]/_components/CommentForm";
import CommentLoading from "@/app/honeytips/[id]/_components/CommentLoading";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/app/honeytips/[id]/_hooks/useCommentMutaion";
import { useCommentDataQuery } from "@/app/honeytips/[id]/_hooks/useCommentQuery";
import { getId } from "@/app/honeytips/_utils/auth";
import { fetchPostDetail } from "@/app/honeytips/_utils/detail";
import { useModalStore } from "@/store/modalStore";
import "dayjs/locale/ko";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const CommentList = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>("");
  const [postOwnerId, setPostOwnerId] = useState<string | null>(null);
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>(
    {},
  );

  const params = useParams();
  const postId = params.id as string;

  const { isModalOpen, modalCommentId, openModal, closeModal } =
    useModalStore();

  const { data: comments, isError, isPending } = useCommentDataQuery(postId);
  const deleteCommentMutation = useDeleteCommentMutation();
  const updateCommentMutation = useUpdateCommentMutation();

  useEffect(() => {
    const fetchUserIdAndPostOwner = async () => {
      const userId = await getId();
      setCurrentId(userId);

      try {
        const postDetail = await fetchPostDetail(postId);
        if (postDetail) {
          setPostOwnerId(postDetail.user_id);
        }
      } catch (error) {
        console.error("포스트 데이터를 불러오지 못했습니다", error);
      }
    };

    fetchUserIdAndPostOwner();
  }, [postId]);

  const handleCommentDelete = (id: string) => {
    deleteCommentMutation.mutate(id);
    closeModal();
  };

  const handleCommentSave = (id: string) => {
    if (!editedComment.trim()) return;

    updateCommentMutation.mutate({
      editingComment: editedComment,
      editingId: id,
      postId,
    });

    setEditingCommentId(null);
    closeDropdown(id);
  };

  const toggleDropdown = (commentId: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const closeDropdown = (commentId: string) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [commentId]: false,
    }));
  };

  const isOwner = (commentUserId: string) => {
    return postOwnerId === commentUserId;
  };

  if (isPending) return <CommentLoading />;
  if (isError) return <div>에러가 발생했습니다!</div>;

  return (
    <div className="mx-5 mb-14 mt-[14px] flex flex-col lg:mx-auto lg:max-w-[762px]">
      <p className="border-b border-base-400 pb-2 font-bold text-base-800">
        댓글 {comments.length || 0}
      </p>
      <section className="my-5 flex flex-col items-center justify-center gap-3 rounded">
        {comments.length === 0 ? (
          <p className="text-sm text-base-400">입력된 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentId={currentId}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              editedComment={editedComment}
              setEditedComment={setEditedComment}
              isDropdownOpen={dropdownStates[comment.id] || false}
              toggleDropdown={() => toggleDropdown(comment.id)}
              closeDropdown={() => closeDropdown(comment.id)}
              isModalOpen={isModalOpen && modalCommentId === comment.id}
              openModal={() => openModal('default', comment.id)}
              closeModal={closeModal}
              handleCommentDelete={handleCommentDelete}
              handleCommentSave={handleCommentSave}
              isOwner={isOwner(comment.user_id)}
              modalCommentId={modalCommentId}
            />
          ))
        )}
      </section>
      <CommentForm />
    </div>
  );
};

export default CommentList;
