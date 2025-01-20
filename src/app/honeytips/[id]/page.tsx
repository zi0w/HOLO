import CommentList from "@/app/honeytips/[id]/_components/CommentList";
import DetailCard from "@/app/honeytips/[id]/_components/DetailCard";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostDetail } from "@/app/honeytips/_utils/detail";

export const dynamic = "force-dynamic";

export const generateMetadata = async ({ params }: Props) => {
  const postDetailData: Post | null = await fetchPostDetail(params.id);

  if (!postDetailData) {
    return {
      title: "자취 꿀팁 게시글 - 오류",
      description: "게시글을 찾을 수 없습니다.",
    };
  }

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

const DetailPage = ({ params }: Props) => {
  const postId = params.id;

  return (
    <>
      <DetailCard postId={postId} />
      <CommentList />
    </>
  );
};

export default DetailPage;
