import PostList from "@/app/honeytips/_components/PostList";
import SearchForm from "@/app/honeytips/_components/SearchForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "자취 꿀팁 게시판",
  description:
    "다양한 카테고리의 자취 꿀팁을 확인하고, 다른 사람들과 꿀팁을 공유하세요.",
  openGraph: {
    title: "자취 꿀팁 게시판",
    description:
      "다양한 카테고리의 자취 꿀팁을 확인하고, 다른 사람들과 꿀팁을 공유하세요.",
    url: "https://localhost:3000/honeytips",
  },
};

const HoneyTipsPage = () => {
  return (
    <div className="mt-5 mx-5 min-h-screen">
      <section>
        <div>
          <h1 className="mb-4 text-left text-[24px] font-bold text-base-800">
            꿀팁 게시판
          </h1>
        </div>
        <section className="mb-2">
          <SearchForm />
        </section>
        <section>
          <PostList />
        </section>
      </section>
    </div>
  );
};

export default HoneyTipsPage;
