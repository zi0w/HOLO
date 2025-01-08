import CommentForm from "@/app/honeytips/[id]/_components/CommentForm";
import CommentList from "@/app/honeytips/[id]/_components/CommentList";
import DetailCard from "@/app/honeytips/[id]/_components/DetailCard";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostDetail } from "@/app/honeytips/_utils/detail";

type Props = {
  params: {
    id: string;
  };
};

const DetailPage = async ({ params }: Props) => {
  const data: Post = await fetchPostDetail(params.id);

  return (
    <>
      <DetailCard data={data} />
      <CommentForm data={data} />
      <CommentList data={data} />
    </>
  );
};

export default DetailPage;
