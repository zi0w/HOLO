import PostForm from "@/app/honeytips/post/_components/PostForm";

const PostPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-4xl font-bold">게시글 작성</h1>
      <PostForm />
    </div>
  );
};

export default PostPage;
