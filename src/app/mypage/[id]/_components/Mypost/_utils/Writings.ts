// // src/app/mypage/[id]/_hooks/useWritings.ts
// import { useEffect, useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getId } from "@/app/honeytips/_utils/auth";
// import { createClient } from '@/lib/utils/supabase/client';
// import type { Post } from "@/app/mypage/_types/mypage";

// const supabase = createClient();

// const fetchWritingData = async (userId: string): Promise<Post[]> => {
//   const { data, error } = await supabase
//     .from('posts')
//     .select('*')
//     .eq('user_id', userId)
//     .order('created_at', { ascending: false });

//   if (error) throw error;
//   if (!data) return [];
  
//   return data;
// };

// const deletePost = async (postId: string): Promise<void> => {
//   const { error } = await supabase
//     .from('posts')
//     .delete()
//     .eq('id', postId);

//   if (error) throw error;
// };

// export const useWritings = () => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const id = await getId();
//       setUserId(id);
//     };
//     fetchUserId();
//   }, []);

//   const { data: posts = [], isLoading } = useQuery<Post[]>({
//     queryKey: ["posts", userId],
//     queryFn: () => userId ? fetchWritingData(userId) : Promise.resolve([]),
//     enabled: !!userId,
//   });

//   const deletePostMutation = useMutation<
//     void,
//     Error,
//     string,
//     { previousPosts: Post[] }
//   >({
//     mutationFn: deletePost,
//     onMutate: async (postId) => {
//       await queryClient.cancelQueries({ queryKey: ["posts", userId] });

//       const previousPosts = queryClient.getQueryData<Post[]>([
//         "posts",
//         userId,
//       ]) || [];

//       queryClient.setQueryData<Post[]>(["posts", userId], (old = []) => {
//         return old.filter((post) => post.id !== postId);
//       });

//       return { previousPosts };
//     },
//     onError: (_, __, context) => {
//       if (context?.previousPosts) {
//         queryClient.setQueryData(
//           ["posts", userId],
//           context.previousPosts,
//         );
//       }
//       alert("게시글 삭제 중 오류가 발생했습니다.");
//     },
//     onSuccess: () => {
//       alert("게시글이 삭제되었습니다.");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["posts", userId] });
//     },
//   });

//   const handleDelete = async (postId: string) => {
//     if (window.confirm("게시글을 삭제하시겠습니까?")) {
//       try {
//         await deletePostMutation.mutateAsync(postId);
//       } catch (error) {
//         console.error("게시글 삭제 중 오류:", error);
//       }
//     }
//   };

//   return {
//     posts,
//     isLoading,
//     handleDelete,
//   };
// };




// // // api/posts.ts
// // import type { Writing } from "@/app/mypage/[id]/_components/_type/Writing";
// // import { createClient } from "@/lib/utils/supabase/client";


// // const supabase = createClient();

// // export const fetchMyPostsData = async (userId: string): Promise<Writing[]> => {
// //   const { data, error } = await supabase
// //     .from("posts")
// //     .select(
// //       `
// //       *,
// //       users (
// //         nickname,
// //         profile_image_url
// //       )
// //     `,
// //     )
// //     .eq("user_id", userId)
// //     .order("created_at", { ascending: false });

// //   if (error) throw error;
// //   return data || [];
// // };

// // export const deletePost = async (postId: string) => {
// //   const { error } = await supabase
// //     .from("posts")
// //     .delete()
// //     .match({ id: postId });
// //   if (error) throw error;
// // };