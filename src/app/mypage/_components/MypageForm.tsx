"use client";

import MyCommentList from "@/app/mypage/[id]/_components/my-comment/MyCommentList";
import MyLikeList from "@/app/mypage/[id]/_components/mylike/LikeList";
import MyWritingList from "@/app/mypage/[id]/_components/mypost/WritingList";
import DeleteAccount from "@/app/mypage/_components/DeleteAccount";

import UserProfile from "@/app/mypage/_components/UserProfile";
import type { ActiveSection } from "@/app/mypage/_types/myPage";
import SignoutButton from "@/app/sign-in/_components/SignoutButton";
import useAuthStore from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

const Mypageform = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("likes");
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchInitialData = useCallback(async () => {
    if (userId && isInitialLoad) {
      await queryClient.prefetchQuery({
        queryKey: ["likedPosts", userId],
        staleTime: 1000 * 60 * 5,
      });
      setIsInitialLoad(false);
    }
  }, [userId, queryClient, isInitialLoad]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

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
    <div className="relative bg-white">
      <div className={clsx("mt-[-5px]")}>
        <UserProfile />
      </div>

      <div className="mt-[60px]">
        <div className="flex justify-center gap-16">
          <div className={clsx("relative")}>
            <button
              onClick={() => handleSectionChange("likes")}
              className={clsx(
                "font-pretendard px-2 text-base font-medium",
                activeSection === "likes" ? "text-[#FF7600]" : "text-[#8F8F8F]",
              )}
            >
              좋아요
            </button>
            {activeSection === "likes" && (
              <div
                className={clsx(
                  "absolute -bottom-1 left-0 h-[2px] w-full bg-[#FF7600]",
                )}
              />
            )}
          </div>

          <div className={clsx("relative")}>
            <button
              onClick={() => handleSectionChange("comments")}
              className={clsx(
                "font-pretendard px-2 text-base font-medium",
                activeSection === "comments"
                  ? "text-[#FF7600]"
                  : "text-[#8F8F8F]",
              )}
            >
              댓글
            </button>
            {activeSection === "comments" && (
              <div
                className={clsx(
                  "absolute -bottom-1 left-0 h-[2px] w-full bg-[#FF7600]",
                )}
              />
            )}
          </div>

          <div className={clsx("relative")}>
            <button
              onClick={() => handleSectionChange("myPosts")}
              className={clsx(
                "font-pretendard px-2 text-base font-medium",
                activeSection === "myPosts"
                  ? "text-[#FF7600]"
                  : "text-[#8F8F8F]",
              )}
            >
              내가 쓴 글
            </button>
            {activeSection === "myPosts" && (
              <div
                className={clsx(
                  "absolute -bottom-1 left-0 h-[2px] w-full bg-[#FF7600]",
                )}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "mt-1 w-full border-t border-[#FFE4CC] bg-[#FFE4CC] md:mx-auto md:h-[1px] md:w-[549px]",
        )}
      />

      
      <div
    
      >
        {renderSection()}
      </div>

      <div
        className={clsx(
          "mx-[20px] mt-[20px] flex flex-col lg:mx-auto lg:flex-row lg:items-center lg:justify-center lg:gap-2",
        )}
      >
        <SignoutButton />
        <div className={clsx("mt-[16px] lg:mt-0")}>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Mypageform;
