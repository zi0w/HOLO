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
    url: "https://your-website.com/honeytips",
  },
};

const HoneyTipsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <section className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">꿀팁 게시판</h1>
          <p className="mt-2 text-gray-600">
            다양한 카테고리의 자취 꿀팁을 확인하세요!
          </p>
        </div>

        <section className="mb-6 flex items-center justify-center">
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
