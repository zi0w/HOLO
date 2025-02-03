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
    <div className="md:translate-y-15 relative translate-y-10 bg-white">
      <div className="pt-[5px]">
        <UserProfile />
      </div>

      <div className="mt-16">
        <div className="flex justify-center gap-16">
          <div className="relative">
            <button
              onClick={() => handleSectionChange("likes")}
              className={clsx(
                "px-2 text-base font-medium",
                activeSection === "likes"
                  ? "text-primary-500"
                  : "text-base-500",
              )}
            >
              좋아요
            </button>
            {activeSection === "likes" && (
              <div className="absolute left-0 top-[calc(100%+1px)] h-0.5 w-full bg-primary-500" />
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => handleSectionChange("comments")}
              className={clsx(
                "px-2 text-base font-medium",
                activeSection === "comments"
                  ? "text-primary-500"
                  : "text-base-500",
              )}
            >
              댓글
            </button>
            {activeSection === "comments" && (
              <div className="absolute left-0 top-[calc(100%+1px)] h-0.5 w-full bg-primary-500" />
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => handleSectionChange("myPosts")}
              className={clsx(
                "px-2 text-base font-medium",
                activeSection === "myPosts"
                  ? "text-primary-500"
                  : "text-base-500",
              )}
            >
              내가 쓴 글
            </button>
            {activeSection === "myPosts" && (
              <div className="absolute left-0 top-[calc(100%+1px)] h-0.5 w-full bg-primary-500" />
            )}
          </div>
        </div>
      </div>
      <div className="mt-1 w-full border-t border-primary-100 bg-primary-100 md:mx-auto md:w-[548px]" />

      <div>{renderSection()}</div>

      <div className="mx-5 mt-5 flex flex-col lg:mx-auto lg:flex-row lg:items-center lg:justify-center lg:gap-2">
        <SignoutButton />
        <div className="mt-4 lg:mt-0">
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Mypageform;
