import CommentForm from "@/app/honeytips/[id]/_components/CommentForm";
import CommentList from "@/app/honeytips/[id]/_components/CommentList";
import DetailCard from "@/app/honeytips/[id]/_components/DetailCard";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostDetail } from "@/app/honeytips/_utils/detail";

export const generateMetadata = async ({ params }: Props) => {
  const postDetailData: Post = await fetchPostDetail(params.id);

  return {
    title: `${postDetailData.title} - 자취 꿀팁 게시글`,
    description: `${postDetailData.content.slice(0, 150)}...`,
  };
};

type Props = {
  params: {
    id: string;
  };
};

const DetailPage = async ({ params }: Props) => {
  const postDetailData: Post = await fetchPostDetail(params.id);

  return (
    <>
      <DetailCard postDetailData={postDetailData} />
      <CommentForm postDetailData={postDetailData} />
      <CommentList postDetailData={postDetailData} />
    </>
  );
};

export default DetailPage;
