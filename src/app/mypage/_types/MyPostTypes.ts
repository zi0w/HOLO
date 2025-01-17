// // MyPostTypes.ts
// export type Post = {
//   id: string;
//   title: string;
//   content: string;
//   created_at: string;
//   user_id: string;
//   post_image_url: string[] | null;
//   likes: { user_id: string }[];
//   users?: {
//     nickname: string;
//     profile_image_url: string | null;
//   };
// };


export type Post = {
  id: string; // 게시글 ID
  title: string; // 게시글 제목
  content: string; // 게시글 내용
  created_at: string; // 작성일
  user_id: string; // 작성자 ID
  post_image_url: string[] | null; // 게시글 이미지 URL 배열
  likes: { user_id: string }[]; // 좋아요한 사용자 ID 배열
  users: {
    nickname: string; // 작성자 닉네임
    profile_image_url: string | null; // 작성자 프로필 이미지 URL
  };
  comments?: { count: number }[]; // 댓글 수 (선택적)
  categories?: string[]; // 카테고리 (선택적)
};
