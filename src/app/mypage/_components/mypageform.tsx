// components/Mypageform.tsx
"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import SignoutButton from "@/app/sign-in/_components/SignoutButton";
import DeleteAccount from "@/app/mypage/_components/DeleteAccount";
import UserProfile from "@/app/mypage/_components/UserProfile";
import MyWritingList from "@/app/mypage/[id]/_components/Mypost/MyWritingList";
import MyCommentList from "@/app/mypage/[id]/_components/Mycomment/MyCommentList";
import MyLikeList from "@/app/mypage/[id]/_components/Mylike/MyLikeList";
import type { ActiveSection } from "@/app/mypage/_types/mypage";

const Mypageform: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("likes");
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  const handleSectionChange = (section: ActiveSection) => {
    setActiveSection(section);

    switch (section) {
      case "likes":
        queryClient.invalidateQueries({ queryKey: ["likedPosts", userId] });
        break;
      case "comments":
        queryClient.invalidateQueries({ queryKey: ["comments", userId] });
        break;
      case "myPosts":
        queryClient.invalidateQueries({ queryKey: ["myPosts", userId] });
        break;
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "likes":
        return <MyLikeList />;
      case "comments":
        return <MyCommentList />;
      case "myPosts":
        return <MyWritingList />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <UserProfile />
      <div className="flex space-x-24 mb-4 absolute left-[59px] top-[366px]">
        <button 
          onClick={() => handleSectionChange("likes")}
          className={`h-6 font-pretendard text-base font-medium leading-6 text-center underline decoration-[#999E98] underline-offset-[from-font] ${
            activeSection === "likes" ? "text-[#999E98]" : ""
          }`}
        >
          좋아요
        </button>
        <button 
          onClick={() => handleSectionChange("comments")}
          className={`h-6 font-pretendard text-base font-medium leading-6 text-center underline decoration-[#999E98] underline-offset-[from-font] ${
            activeSection === "comments" ? "text-[#999E98]" : ""
          }`}
        >
          댓글
        </button>
        <button 
          onClick={() => handleSectionChange("myPosts")}
          className={`h-6 font-pretendard text-base font-medium leading-6 text-center underline decoration-[#999E98] underline-offset-[from-font] ${
            activeSection === "myPosts" ? "text-[#999E98]" : ""
          }`}
        >
          내가 쓴 글
        </button>
      </div>

      <div className="absolute left-[21px] top-[432px] h-[442px] w-[362px] rounded-tl-[4px] border border-[#E0E0E0] bg-white">
        {renderSection()}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center space-y-4">
        <SignoutButton />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Mypageform;