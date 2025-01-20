// components/LikeCard.tsx
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/app/mypage/[id]/_components/Mylike/_utils/formatDate";
import MyLikeButton from "@/app/mypage/_components/MyLikeButton";
import type { Post } from "@/app/mypage/_types/mypage";

export type LikeCardProps = {
  post: Post;
  onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
};

const MyLikeCard = ({ post, onLikeChange }: LikeCardProps) => {
  // MyLikeCard.tsx의 return 부분
  return (
    <div className="flex h-[50px] w-[322px] items-center justify-between mx-5 mb-2">
      <Link 
        href={`/honeytips/${post.id}`}
        className="flex items-center gap-2 flex-1"
      >
        {post.post_image_url && post.post_image_url.length > 0 ? (
          <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-[4px]">
            <Image
              src={post.post_image_url[0]}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="h-[40px] w-[40px] shrink-0" /> 
        )}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h3 className="text-[14px] font-medium text-[#424242] line-clamp-1">{post.title}</h3>
          <p className="text-[12px] text-[#8F8F8F] line-clamp-1">{post.content}</p>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-[#8F8F8F]">
          {formatDate(post.created_at)}
        </span>
        <div className="flex items-center justify-center w-[20px]">
          <MyLikeButton
            postId={post.id}
            isLiked={true}
            onLikeChange={onLikeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MyLikeCard;

// src/app/mypage/[id]/_components/Mylike/MyLikeCard.tsx

// //원본 건드리지마라
// // // components/LikeCard.tsx
// // import Link from "next/link";
// // import Image from "next/image";

// // import type { Post } from "@/app/mypage/_types/mypage";
// // import MyLikeButton from "@/app/mypage/_components/MyLikeButton";
// // import { formatDate } from "@/app/mypage/[id]/_components/Mylike/_utils/formatDate";

// // export type LikeCardProps = {
// //   post: Post;
// //   onLikeChange: (postId: string, action: "add" | "delete") => Promise<void>;
// // }

// // const MyLikeCard = ({ post, onLikeChange }: LikeCardProps) => {
// //   return (
// //     <div className="flex h-[64px] w-full items-center justify-between border-b border-[#E6E6E6] px-5">
// //       <Link
// //         href={`/honeytips/${post.id}`}
// //         className="flex items-center gap-3 flex-1"
// //       >
// //         {post.post_image_url && post.post_image_url.length > 0 && (
// //           <div className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-[4px]">
// //             <Image
// //               src={post.post_image_url[0]}
// //               alt={post.title}
// //               fill
// //               className="object-cover"
// //             />
// //           </div>
// //         )}
// //         <div className="flex flex-col gap-2 flex-1 min-w-0">
// //           <h3 className="text-[14px] font-bold line-clamp-1">{post.title}</h3>
// //           <p className="text-[12px] text-[#8F8F8F] line-clamp-1">{post.content}</p>
// //         </div>
// //       </Link>
// //       <div className="flex items-center gap-3">
// //         <span className="text-[12px] text-[#8F8F8F]">
// //           {formatDate(post.created_at)}
// //         </span>
// //         <MyLikeButton
// //           postId={post.id}
// //           isLiked={true}
// //           onLikeChange={onLikeChange}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default MyLikeCard;
