import { useLikeMutation } from "@/app/honeytips/[id]/_hooks/useLikeMutation";
import { useLikeDataQuery } from "@/app/honeytips/[id]/_hooks/useLikeQuery";
import type { Like } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// LikeButton component
const MyLikeButton = ({ postId, onLikeChange }: { postId: Like["post_id"], onLikeChange: () => void }) => {
    const { data: likeData, isError, isPending } = useLikeDataQuery(postId);
    const likeMutation = useLikeMutation(postId);
  
    const handleLikeBtn = async () => {
      const userId: Like["user_id"] | null = await getId();
  
      if (!userId) {
        alert("로그인이 필요합니다.");
        return;
      }
  
      if (likeData!.length > 0) {
        likeMutation.mutate({ action: "delete", userId, postId }, {
          onSuccess: () => {
            onLikeChange();
          }
        });
      } else {
        likeMutation.mutate({ action: "add", userId, postId }, {
          onSuccess: () => {
            onLikeChange();
          }
        });
      }
    };
  
    if (isPending) {
      return <p>로딩중...</p>;
    }
  
    if (isError) {
      return <p>에러가 발생했습니다.</p>;
    }
  
    return (
      <section className="flex text-2xl">
        <button onClick={handleLikeBtn}>
          {likeData?.length ? (
            <FaHeart className="text-primary-500" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </section>
    );
  };
  export default MyLikeButton;