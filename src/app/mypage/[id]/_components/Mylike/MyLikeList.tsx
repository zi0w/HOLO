// components/MyLikeList.tsx
"use client";

import type { Post } from "@/app/mypage/[id]/_components/_type/types";
import { useLikes } from "@/app/mypage/[id]/_components/Mylike/_hooks/useLikes";
import MyLikeCard from "@/app/mypage/[id]/_components/Mylike/MyLikeCard";


const MyLikeList = () => {
  const { likedPosts, isLoading, handleLikeChange } = useLikes();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="container mx-auto p-4">
      {likedPosts?.map((post: Post) => (
        <MyLikeCard 
          key={post.id} 
          post={post} 
          onLikeChange={handleLikeChange} 
        />
      ))}
    </div>
  );
};

export default MyLikeList;