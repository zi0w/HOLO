"use client";


import ProfileEditModal from "@/app/mypage/_components/ProfileEditModal";
import UserProfile from "@/app/mypage/_components/UserProfile";
import SignoutButton from "@/app/sign-in/_components/SignoutButton";
import { useState } from "react";
import MyLikeList from "@/app/mypage/[id]/_components/Mylike/MyLikeList";
import MyCommentList from "@/app/mypage//[id]/_components/Mycomment/MyCommentList";
import MyWritingtList from "@/app/mypage/[id]/_components/Mypost/MyWritingtList";
// 내가 쓴 글 리스트 컴포넌트 임포트

const Mypageform: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("likes"); // 현재 활성화된 섹션 상태

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="mt-12 flex flex-col items-center">
      <UserProfile />
      <hr className="mb-4 w-full border-t border-gray-300" />
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveSection("likes")}
          className={`rounded px-4 py-2 text-black ${activeSection === "likes" ? "bg-gray-400" : "bg-gray-300 hover:bg-gray-400"}`}
        >
          좋아요
        </button>
        <button
          onClick={() => setActiveSection("comments")}
          className={`rounded px-4 py-2 text-black ${activeSection === "comments" ? "bg-gray-400" : "bg-gray-300 hover:bg-gray-400"}`}
        >
          댓글
        </button>
        <button
          onClick={() => setActiveSection("myPosts")}
          className={`rounded px-4 py-2 text-black ${activeSection === "myPosts" ? "bg-gray-400" : "bg-gray-300 hover:bg-gray-400"}`}
        >
          내가 쓴 글
        </button>
      </div>

      {/* 폼을 감싸는 박스 */}
      <div
        className="h-auto w-full max-w-3xl border border-gray-300 bg-white p-4"
        style={{ minHeight: "300px" }}
      >
        {/* 좋아요 섹션이 활성화된 경우 */}
        {activeSection === "likes" && (
          <div className="flex flex-col items-center">
            <MyLikeList />
            {/* 페이지네이션 버튼 제거 */}
          </div>
        )}

        {/* 댓글 섹션이 활성화된 경우 */}
        {activeSection === "comments" && (
          <MyCommentList /> // 댓글 리스트 표시
        )}

        {/* 내가 쓴 글 섹션이 활성화된 경우 */}
        {activeSection === "myPosts" && (
          <MyWritingtList /> // 내가 쓴 글 리스트 표시
        )}
      </div>

      {/* 회원 탈퇴 버튼을 박스 아래로 이동하고 오른쪽으로 정렬 */}
      <div className="mt-6 flex w-full max-w-xl justify-end pr-2">
        <button className="rounded border border-gray-300 bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">
          회원 탈퇴
        </button>
      </div>

      <SignoutButton />
      {/* 프로필 수정 모달 */}
      <ProfileEditModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Mypageform;
