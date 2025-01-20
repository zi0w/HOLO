// "use client";

// import type { Like } from "@/app/honeytips/_types/honeytips.type";
// import { addLike, deleteLike } from "@/app/honeytips/_utils/like";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { v4 as uuidv4 } from "uuid";

// export const myLikeMutation = (postId: Like["post_id"]) => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     unknown,
//     Error,
//     {
//       action: "add" | "delete";
//       userId: Like["user_id"];
//       postId: Like["post_id"];
//     },
//     { previousLikes: Like[] | undefined }
//   >({
//     mutationFn: ({ action, userId, postId }) => {
//       if (action === "add") {
//         return addLike({ userId, postId });
//       } else if (action === "delete") {
//         return deleteLike({ userId, postId });
//       }
//       throw new Error("Invalid action value.");
//     },
//     onMutate: async ({ action, userId, postId }) => {
//       await queryClient.cancelQueries({ queryKey: ["likes", postId] });
//       const previousLikes = queryClient.getQueryData<Like[]>(["likes", postId]);

//       queryClient.setQueryData<Like[]>(["likes", postId], (prev) => {
//         if (!prev) return [];
//         if (action === "add") {
//           const tempId = uuidv4();
//           const now = new Date().toISOString();
//           return [...prev, {user_id: userId, post_id: postId, created_at: now, id: tempId}];
//         } else if (action === "delete") {
//           return prev.filter((like) => like.user_id !== userId);
//         }
//         return prev;
//       });  
//       return { previousLikes };
//     },
//     onError: (_, __, context) => {
//       if (context?.previousLikes) {
//         queryClient.setQueryData(["likes", postId], context.previousLikes);
//       }
//     },
//     onSuccess: (_, { userId }) => {
//       queryClient.invalidateQueries({ queryKey: ["likes", postId] });
//       queryClient.invalidateQueries({ queryKey: ["likedPosts", userId] });
//     }, 
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["likes", postId] });
//     },
//   });
// };
