import PostForm from "@/app/honeytips/post/_components/PostForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자취 꿀팁 작성하기 - 자취 꿀팁 게시판",
  description:
    "자취 생활에 도움이 되는 꿀팁을 작성하여 다른 사람들과 공유하세요.",
};

const PostPage = () => {
  return <PostForm />;
};

export default PostPage;
