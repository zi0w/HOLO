import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostDetail } from "@/app/honeytips/_utils/detail";
import UpdatePostForm from "@/app/honeytips/update/[id]/_components/UpdatePostForm";

export const generateMetadata = async ({ params }: Props) => {
  const postDetailData: Post = await fetchPostDetail(params.id);

  return {
    title: `${postDetailData.title} - 자취 꿀팁 수정`,
    description: `${postDetailData.content.slice(0, 150)}...`,
  };
};

type Props = {
  params: {
    id: string;
  };
};

const UpdatePostPage = async ({ params }: Props) => {
  const postDetailData: Post = await fetchPostDetail(params.id);

  return <UpdatePostForm postDetailData={postDetailData} />;
};

export default UpdatePostPage;
