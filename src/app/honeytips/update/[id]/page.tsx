import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { fetchPostDetail } from "@/app/honeytips/_utils/detail";
import UpdatePostForm from "@/app/honeytips/update/[id]/_components/UpdatePostForm";

type Props = {
  params: {
    id: string;
  };
};

const UpdatePostPage = async ({ params }: Props) => {
  const data: Post = await fetchPostDetail(params.id);

  return <UpdatePostForm data={data} />;
};

export default UpdatePostPage;
