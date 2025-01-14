import { fetchPostDetail } from "@/app/honeytips/_utils/detail";
import PostForm from "@/app/honeytips/post/_components/PostForm";

export const generateMetadata = async ({ searchParams }: Props) => {
  let title = "자취 꿀팁 게시글 작성";
  let description = "자취 꿀팁을 작성해주세요.";

  if (searchParams.edit) {
    const postDetailData = await fetchPostDetail(searchParams.edit);
    if (postDetailData) {
      title = `${postDetailData.title} - 자취 꿀팁 게시글 수정`;
      description = `${postDetailData.content.slice(0, 150)}...`;
    }
  }

  return {
    title,
    description,
  };
};

type Props = {
  searchParams: {
    edit: string;
  };
};

const PostPage = async ({ searchParams }: Props) => {
  const postDetailData = await fetchPostDetail(searchParams.edit);

  return <PostForm postDetailData={postDetailData} />;
};

export default PostPage;
