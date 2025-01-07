import type { Post } from "@/app/honeytips/_types/honeytips.type";

type UpdatePostCardProps = {
  data: Post;
};

const UpdatePostCard = ({ data }: UpdatePostCardProps) => {
  return <div>{data.title}</div>;
};

export default UpdatePostCard;
