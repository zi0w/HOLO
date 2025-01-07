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

  return <DetailCard data={data} />;
};

export default DetailPage;
