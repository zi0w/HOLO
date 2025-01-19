// components/MyWritingList.tsx

import { useMyPosts } from "@/app/mypage/[id]/_components/Mypost/_hooks/useMyPosts";
import MyWritingCard from "./MyWritingCard";

const MyWritingList = () => {
  const { posts, isLoading, handleDelete, isDeleting } = useMyPosts();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <MyWritingCard
          key={post.id}
          post={post}
          onDelete={handleDelete}
          isDeleting={isDeleting(post.id)}
        />
      ))}
    </div>
  );
};

export default MyWritingList;