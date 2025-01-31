"use client";

import DropdownButton from "@/app/honeytips/_components/DropdownButton";
import type { Comment } from "@/app/honeytips/_types/honeytips.type";
import { formatDate } from "@/app/honeytips/_utils/formatDate";
import MenuDots from "@/assets/images/honeytips/more-horizontal.svg";
import ConfirmModal from "@/components/common/ConfirmModal";
import Image from "next/image";

type CommentCardProps = {
  comment: Comment;
  currentId: string | null;
  editingCommentId: string | null;
  setEditingCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  editedComment: string;
  setEditedComment: React.Dispatch<React.SetStateAction<string>>;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  isModalOpen: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
  modalCommentId: string | null;
  modalType: string;
  handleCommentDelete: (id: string) => void;
  handleCommentSave: (id: string) => void;
  isOwner: boolean;
};

const CommentCard = ({
  comment,
  currentId,
  editingCommentId,
  setEditingCommentId,
  editedComment,
  setEditedComment,
  isDropdownOpen,
  toggleDropdown,
  closeDropdown,
  isModalOpen,
  openModal,
  closeModal,
  modalCommentId,
  modalType,
  handleCommentDelete,
  handleCommentSave,
  isOwner,
}: CommentCardProps) => {
  return (
    <article className="mx-5 w-full rounded-lg">
      {isModalOpen && modalType === "default" && (
        <ConfirmModal
          text="삭제"
          isOpen={isModalOpen && modalCommentId === comment.id}
          onConfirm={() => handleCommentDelete(comment.id)}
          onCancel={() => {
            closeModal();
            closeDropdown();
          }}
        />
      )}

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
              {isOwner && (
                <p className="rounded border px-2 py-1 text-xs text-primary-500">
                  작성자
                </p>
              )}
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
              onClick={toggleDropdown}
            >
              <MenuDots />
            </button>
            {isDropdownOpen && (
              <div className="absolute bottom-[31px] right-0 z-10 w-[68px] rounded-lg border bg-white py-2">
                {editingCommentId === comment.id ? (
                  <>
                    <DropdownButton
                      label="저장"
                      onClick={() => handleCommentSave(comment.id)}
                    />
                    <DropdownButton
                      label="취소"
                      onClick={() => {
                        setEditingCommentId(null);
                        closeDropdown();
                      }}
                    />
                  </>
                ) : (
                  <>
                    <DropdownButton
                      label="수정"
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedComment(comment.comment);
                      }}
                    />
                    <DropdownButton
                      label="삭제"
                      onClick={() => openModal(comment.id)}
                    />
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
