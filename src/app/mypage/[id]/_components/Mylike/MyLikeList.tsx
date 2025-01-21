// components/MyLikeList.tsx
import { useLikes } from "@/app/mypage/[id]/_components/Mylike/_hooks/useLikes";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

import MyLikeCard from "@/app/mypage/[id]/_components/Mylike/MyLikeCard";
import type { Post } from "@/app/mypage/_types/mypage";

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
    <div className="h-full w-full pt-[10px]">
      {currentPosts.length > 0 ? (
        <div className="flex h-full flex-col relative"> {/* relative 추가 */}
          <div className="flex-1">
            {currentPosts.map((post) => (
              <MyLikeCard
                key={post.id}
                post={post}
                onLikeChange={handleLikeChange}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-[86px] py-4 pr-[90px] bg-white"> {/* absolute, bottom-0, left-0, right-0, bg-white 추가 */}
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
        <p className="py-4 text-center text-[#8F8F8F]">
          좋아요한 게시물이 없습니다.
        </p>
      )}
    </div>
  );
};

export default MyLikeList;
