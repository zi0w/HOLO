// components/MyLikeList.tsx
import { useLikes } from "@/app/mypage/[id]/_components/Mylike/_hooks/useLikes";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

import type { Post } from "@/app/mypage/_types/mypage";
import MyLikeCard from "@/app/mypage/[id]/_components/Mylike/MyLikeCard";

const MyLikeList = () => {
  const { likedPosts, isLoading, handleLikeChange } = useLikes();

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination<Post>(likedPosts || [], 5);

  if (isLoading) return <p>로딩중입니다...</p>;
// MyLikeList.tsx의 return 부분// MyLikeList.tsx return 부분
// MyLikeList.tsx의 return 부분retu// MyLikeList.tsx의 return 부분
// MyLikeList.tsx의 return 부분
// MyLikeList.tsx의 return 부분
return (
  <div className="w-full h-full pt-2 pb-2">
    {currentPosts.length > 0 ? (
      <div className="flex flex-col h-full">
        {currentPosts.map((post) => (
          <MyLikeCard
            key={post.id}
            post={post}
            onLikeChange={handleLikeChange}
          />
        ))}
        <div className="px-[86px] pr-[90px] mt-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startButtonIndex={startButtonIndex}
            maxButtonsToShow={maxButtonsToShow}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            onGoToPage={goToPage}
          />
        </div>
      </div>
    ) : (
      <p className="text-center text-[#8F8F8F] py-4">좋아요한 게시물이 없습니다.</p>
    )}
  </div>
);
};

export default MyLikeList;

