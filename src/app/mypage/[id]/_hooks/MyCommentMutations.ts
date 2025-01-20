// "use client";

// import type { Comment } from "@/app/honeytips/_types/honeytips.type"; // Comment 타입 임포트
// import { deleteComment, updateComment } from "@/app/honeytips/_utils/comment"; // 댓글 관련 API 함수 임포트
// import { createClient } from "@/lib/utils/supabase/client"; // Supabase 클라이언트 임포트
// import { useMutation, useQueryClient } from "@tanstack/react-query"; // React Query의 useMutation 및 useQueryClient 임포트

// const supabase = createClient(); // Supabase 클라이언트 생성

// // 댓글 추가 함수
// export const addComment = async (newComment: {
//   comment: Comment["comment"];
//   postId: Comment["post_id"];
//   userId: string; // userID 추가
// }) => {
//   const { comment, postId, userId } = newComment; // 구조 분해 할당

//   if (!userId) {
//     console.error("유저 아이디를 찾을 수 없습니다.");
//     throw new Error("유저 아이디를 찾을 수 없습니다.");
//   }

//   const { data: commentData, error } = await supabase
//     .from("comments")
//     .insert([
//       {
//         comment,
//         post_id: postId,
//         user_id: userId, // userID 사용
//       },
//     ])
//     .select();

//   if (error) {
//     console.error("코멘트 저장에 실패했습니다.");
//     throw error;
//   }

//   return commentData;
// };

// // 댓글 추가 뮤테이션
// export const myAddCommentMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     unknown,
//     Error,
//     { comment: Comment["comment"]; postId: Comment["post_id"]; userId: string }
//   >({
//     mutationFn: ({ comment, postId, userId }) =>
//       addComment({ comment, postId, userId }), // userId 포함
//     onSuccess: (_, { userId }) => {
//       queryClient.invalidateQueries({ queryKey: ["comments"] });
//       queryClient.invalidateQueries({ queryKey: ["commentedPosts", userId] });
//     },
//     onError: (error) => {
//       console.error("댓글 추가 중 오류가 발생했습니다.", error.message);
//     },
//   });
// };

// // 댓글 수정 뮤테이션
// type CommentUpdateVariable = {
//   editingComment: Comment["comment"];
//   editingId: Comment["id"];
//   postId: Comment["post_id"];
//   userId: string;
// };

// type CommentUpdateContext = { previousComments: Comment[] | undefined };

// export const myUpdateCommentMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     unknown,
//     Error,
//     CommentUpdateVariable,
//     CommentUpdateContext
//   >({
//     mutationFn: ({ editingComment, editingId, postId }) =>
//       updateComment({ editingComment, editingId, postId }),
//     onMutate: async ({ editingComment, editingId, postId }) => {
//       await queryClient.cancelQueries({ queryKey: ["comments", postId] });

//       const previousComments = queryClient.getQueryData<Comment[]>([
//         "comments",
//         postId,
//       ]);

//       queryClient.setQueryData<Comment[]>(["comments", postId], (prev) =>
//         prev?.map((comment) =>
//           comment.id === editingId
//             ? { ...comment, comment: editingComment }
//             : comment,
//         ),
//       );
//       return { previousComments };
//     },
//     onError: (_, __, context) => {
//       if (context?.previousComments) {
//         queryClient.setQueryData(
//           ["comments", context.previousComments[0].post_id],
//           context.previousComments,
//         );
//       }
//     },
//     onSuccess: (_, { postId, userId }) => {
//       queryClient.invalidateQueries({ queryKey: ["comments", postId] });
//       queryClient.invalidateQueries({ queryKey: ["commentedPosts", userId] });
//     },
//     onSettled: (_, __, { postId }) => {
//       queryClient.invalidateQueries({ queryKey: ["comments", postId] });
//     },
//   });
// };

// // 댓글 삭제 뮤테이션
// export const myDeleteCommentMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation<
//     unknown,
//     Error,
//     { commentId: Comment["id"]; userId: string }
//   >({
//     mutationFn: ({ commentId }) => deleteComment(commentId),
//     onSuccess: (_, { userId }) => {
//       queryClient.invalidateQueries({ queryKey: ["comments"] });
//       queryClient.invalidateQueries({ queryKey: ["commentedPosts", userId] });
//     },
//     onError: (error) => {
//       console.error("댓글 삭제 중 오류가 발생했습니다.", error.message);
//     },
//   });
// };
