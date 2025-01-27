"use client";

import { fetchPostDetail } from "@/app/honeytips/_utils/detail";
import { useEffect, useState } from "react";

const useIsOwner = (postId: string, userId: string) => {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchPostOwner = async () => {
      try {
        const postDetail = await fetchPostDetail(postId);
        if (postDetail && postDetail.user_id === userId) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("포스트 데이터를 불러오지 못했습니다", error);
      }
    };
    fetchPostOwner();
  }, [postId, userId]);

  return isOwner;
};

export default useIsOwner;
