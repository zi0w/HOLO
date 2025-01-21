// src/app/mypage/_components/mypageform.tsx
"use client";

import MyLikeList from "@/app/mypage/[id]/_components/Mmylike/MmyLikeList";
import MyWritingList from "@/app/mypage/[id]/_components/mMypost/MmyWritingList";
import MyCommentList from "@/app/mypage/[id]/_components/my-comment/useMyCommentList";
import DeleteAccount from "@/app/mypage/_components/DeleteAccount";
import UserProfile from "@/app/mypage/_components/UserProfile";
import type { ActiveSection } from "@/app/mypage/_types/mypPage";
import SignoutButton from "@/app/sign-in/_components/SignoutButton";
import useAuthStore from "@/store/authStore";
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
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 fresh하게 유지
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
    <div className={clsx("relative h-[1069px] w-[402px] bg-white")}>
      <div className={clsx("mt-[-5px]")}>
        <UserProfile />
      </div>

      <div className={clsx("mt-[60px]")}>
        <div className={clsx("flex justify-center gap-16")}>
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
                  "absolute -bottom-2 left-0 h-[2px] w-full bg-[#FF7600]",
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
                  "absolute -bottom-2 left-0 h-[2px] w-full bg-[#FF7600]",
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
                  "absolute -bottom-2 left-0 h-[2px] w-full bg-[#FF7600]",
                )}
              />
            )}
          </div>
        </div>
      </div>

      <div className={clsx("mt-1 border-t border-[#FFE4CC]")} />

      <div
        className={clsx(
          "mx-[20px] mt-[10px] h-[400px] w-[362px] rounded-lg border border-[#E0E0E0] bg-white",
        )}
      >
        {renderSection()}
      </div>

      <div className={clsx("mx-[20px] mt-[27px] flex flex-col")}>
        <SignoutButton />
        <div className={clsx("mt-[16px]")}>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Mypageform;

// "use client";

// import MyCommentList from "@/app/mypage/[id]/_components/Mycomment/MyCommentList";
// import MyLikeList from "@/app/mypage/[id]/_components/Mylike/MyLikeList";
// import MyWritingList from "@/app/mypage/[id]/_components/Mypost/MyWritingList";
// import DeleteAccount from "@/app/mypage/_components/DeleteAccount";
// import UserProfile from "@/app/mypage/_components/UserProfile";
// import type { ActiveSection } from "@/app/mypage/_types/Mypage";
// import SignoutButton from "@/app/sign-in/_components/SignoutButton";
// import useAuthStore from "@/store/authStore";
// import { useQueryClient } from "@tanstack/react-query";
// import clsx from "clsx";
// import { useState } from "react";

// const Mypageform = () => {
//   const [activeSection, setActiveSection] = useState<ActiveSection>("likes");
//   const queryClient = useQueryClient();
//   const userId = useAuthStore((state) => state.user?.id);

//   const handleSectionChange = (section: ActiveSection) => {
//     setActiveSection(section);

//     switch (section) {
//       case "likes":
//         queryClient.invalidateQueries({ queryKey: ["likedPosts", userId] });
//         break;
//       case "comments":
//         queryClient.invalidateQueries({ queryKey: ["comments", userId] });
//         break;
//       case "myPosts":
//         queryClient.invalidateQueries({ queryKey: ["myPosts", userId] });
//         break;
//     }
//   };

//   const renderSection = () => {
//     switch (activeSection) {
//       case "likes":
//         return <MyLikeList />;
//       case "comments":
//         return <MyCommentList />;
//       case "myPosts":
//         return <MyWritingList />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className={clsx("relative h-[1069px] w-[402px] bg-white")}>
//       <div className={clsx("mt-[-5px]")}>
//         <UserProfile />
//       </div>

//       <div className={clsx("mt-[60px]")}>
//         <div className={clsx("flex justify-center gap-16")}>
//           <div className={clsx("relative")}>
//             <button
//               onClick={() => handleSectionChange("likes")}
//               className={clsx(
//                 "font-pretendard px-2 text-base font-medium",
//                 activeSection === "likes" ? "text-[#FF7600]" : "text-[#8F8F8F]"
//               )}
//             >
//               좋아요
//             </button>
//             {activeSection === "likes" && (
//               <div className={clsx("absolute -bottom-2 left-0 h-[2px] w-full bg-[#FF7600]")} />
//             )}
//           </div>

//           <div className={clsx("relative")}>
//             <button
//               onClick={() => handleSectionChange("comments")}
//               className={clsx(
//                 "font-pretendard px-2 text-base font-medium",
//                 activeSection === "comments" ? "text-[#FF7600]" : "text-[#8F8F8F]"
//               )}
//             >
//               댓글
//             </button>
//             {activeSection === "comments" && (
//               <div className={clsx("absolute -bottom-2 left-0 h-[2px] w-full bg-[#FF7600]")} />
//             )}
//           </div>

//           <div className={clsx("relative")}>
//             <button
//               onClick={() => handleSectionChange("myPosts")}
//               className={clsx(
//                 "font-pretendard px-2 text-base font-medium",
//                 activeSection === "myPosts" ? "text-[#FF7600]" : "text-[#8F8F8F]"
//               )}
//             >
//               내가 쓴 글
//             </button>
//             {activeSection === "myPosts" && (
//               <div className={clsx("absolute -bottom-2 left-0 h-[2px] w-full bg-[#FF7600]")} />
//             )}
//           </div>
//         </div>
//       </div>

//       <div className={clsx("mt-1 border-t border-[#FFE4CC]")} />

//       <div className={clsx("mx-[20px] mt-[10px] h-[400px] w-[362px] rounded-lg border border-[#E0E0E0] bg-white")}>
//         {renderSection()}
//       </div>

//       <div className={clsx("mx-[20px] mt-[27px] flex flex-col")}>
//         <SignoutButton />
//         <div className={clsx("mt-[16px]")}>
//            <DeleteAccount />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Mypageform;
