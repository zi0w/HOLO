import PostInput from "./_components/PostInput";

const PostPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-center text-4xl font-bold">게시글 작성</h1>
      <PostInput />
    </div>
  );
};

export default PostPage;
