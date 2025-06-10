
import { createClient } from "@/lib/utils/supabase/client";
import { useState, useEffect } from "react";
import { getId } from "@/app/honeytips/_utils/auth";

const supabase = createClient();

export const useLikeList = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleLikeChange = async (postId: string, action: "delete" | "add"): Promise<void> => {
    if (!userId) return;
    
    try {
      if (action === "delete") {
        await supabase
          .from("likes")
          .delete()
          .match({ post_id: postId, user_id: userId });
      } else {
        await supabase
          .from("likes")
          .insert({ post_id: postId, user_id: userId });
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return {
    userId,
    handleLikeChange
  };
};

