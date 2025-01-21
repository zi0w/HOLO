"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import UserProfile from "@/app/mypage/_components/UserProfile";
import MyWritingList from "@/app/mypage/[id]/_components/Mypost/MyWritingList";
import MyCommentList from "@/app/mypage/[id]/_components/Mycomment/MyCommentList";
import MyLikeList from "@/app/mypage/[id]/_components/Mylike/MyLikeList";
import SignoutButton from "@/app/sign-in/_components/SignoutButton";
import DeleteAccount from "@/app/mypage/_components/DeleteAccount";
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
    <div className="relative w-[402px] h-[1069px] bg-white">
      <div className="mt-[-5px]">
        <UserProfile />
      </div>
      
      {/* 탭 버튼들 */}
      <div className="mt-[60px]">
        <div className="flex justify-center gap-16">
          <div className="relative">
            <button 
              onClick={() => handleSectionChange("likes")}
              className={`px-2 font-pretendard text-base font-medium ${
                activeSection === "likes" ? "text-[#FF7600]" : "text-[#8F8F8F]"
              }`}
            >
              좋아요
            </button>
            {activeSection === "likes" && (
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FF7600]" />
            )}
          </div>
  
          <div className="relative">
            <button 
              onClick={() => handleSectionChange("comments")}
              className={`px-2 font-pretendard text-base font-medium ${
                activeSection === "comments" ? "text-[#FF7600]" : "text-[#8F8F8F]"
              }`}
            >
              댓글
            </button>
            {activeSection === "comments" && (
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FF7600]" />
            )}
          </div>
  
          <div className="relative">
            <button 
              onClick={() => handleSectionChange("myPosts")}
              className={`px-2 font-pretendard text-base font-medium ${
                activeSection === "myPosts" ? "text-[#FF7600]" : "text-[#8F8F8F]"
              }`}
            >
              내가 쓴 글
            </button>
            {activeSection === "myPosts" && (
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FF7600]" />
            )}
          </div>
        </div>
      </div>
  
      {/* 구분선 */}
      <div className="border-t border-[#FFE4CC] mt-1" />
  
      {/* 컨텐츠 영역 */}
      <div className="mt-[10px] mx-[20px] w-[362px] h-[400px] border border-[#E0E0E0] rounded-lg bg-white">
        {renderSection()}
      </div>
  
      {/* 버튼 영역 */}
      <div className="mt-[27px] mx-[20px] flex flex-col">
        <SignoutButton />
        <div className="mt-[16px]">
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Mypageform;

