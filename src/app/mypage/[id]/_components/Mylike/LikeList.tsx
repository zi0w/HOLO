import usePagination from "@/app/hooks/usePagination";
import LikeCard from "@/app/mypage/[id]/_components/Mylike/LikeCard";
import { fetchLikePostsData } from "@/app/mypage/_utils/Likepost";
import clsx from "clsx";
import { useEffect, useState } from "react";

const LikeList = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchLikePostsData();
        setPosts(data);
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const {
    currentItems: currentPosts,
    currentPage,
    totalPages,
    startButtonIndex,
    maxButtonsToShow,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(posts, 20); // 한 페이지에 20개씩 표시

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => (
          <LikeCard
            key={post.id}
            post={post}
            onDelete={() => handleDeletePost(post.id)}
          />
        ))
      ) : (
        <p>게시물이 없습니다.</p>
      )}

      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          &lt;
        </button>

        {Array.from({
          length: Math.min(maxButtonsToShow, totalPages - startButtonIndex),
        }).map((_, index) => (
          <button
            key={startButtonIndex + index}
            onClick={() => goToPage(startButtonIndex + index + 1)}
            className={clsx(
              `mx-1 rounded px-3 py-2 ${
                currentPage === startButtonIndex + index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black"
              } hover:bg-blue-500`,
            )}
          >
            {startButtonIndex + index + 1}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default LikeList;
