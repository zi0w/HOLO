"use client";

import MyCommentList from "@/app/mypage/[id]/_components/Mycomment/MyCommentList";
import MyLikeList from "@/app/mypage/[id]/_components/Mylike/MyLikeList";
import MyWritingtList from "@/app/mypage/[id]/_components/Mypost/MyWritingtList";
import DeleteAccount from "@/app/mypage/_components/DeleteAccount"; // 회원 탈퇴 컴포넌트 임포트
import ProfileEditModal from "@/app/mypage/_components/ProfileEditModal";
import UserProfile from "@/app/mypage/_components/UserProfile";
import SignoutButton from "@/app/sign-in/_components/SignoutButton";
import { useState } from "react";

const Mypageform: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("likes");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="mt-8 flex flex-col items-center">
      <UserProfile />
      <div className="mb-2 mt-6 flex w-full justify-center space-x-8">
        <button
          onClick={() => setActiveSection("likes")}
          className={`rounded border px-4 py-2 text-black ${
            activeSection === "likes"
              ? "border-white bg-white"
              : "border-white bg-white hover:bg-gray-100"
          }`}
        >
          좋아요
        </button>
        <button
          onClick={() => setActiveSection("comments")}
          className={`rounded border px-4 py-2 text-black ${
            activeSection === "comments"
              ? "border-white bg-white"
              : "border-white bg-white hover:bg-gray-100"
          }`}
        >
          댓글
        </button>
        <button
          onClick={() => setActiveSection("myPosts")}
          className={`rounded border px-4 py-2 text-black ${
            activeSection === "myPosts"
              ? "border-white bg-white"
              : "border-white bg-white hover:bg-gray-100"
          }`}
        >
          내가 쓴 글
        </button>
      </div>

      <hr className="my-6 w-full border-t border-gray-300" />

      <div
        className="w-full max-w-3xl border border-gray-300 bg-white p-6"
        style={{ minHeight: "300px" }}
      >
        {activeSection === "likes" && (
          <div className="flex flex-col items-center">
            <MyLikeList />
          </div>
        )}

        {activeSection === "comments" && <MyCommentList />}

        {activeSection === "myPosts" && <MyWritingtList />}
      </div>

      <div className="mt-6 flex w-full max-w-3xl flex-col space-y-4">
        <div className="flex justify-end">
          <SignoutButton />
        </div>

        {/* 회원 탈퇴 버튼 추가 */}
        <div className="flex justify-end">
          <DeleteAccount />
        </div>
      </div>

      <ProfileEditModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Mypageform;
