import PostList from "@/app/honeytips/_components/PostList";
import SearchForm from "@/app/honeytips/_components/SearchForm";
import Loading from "@/components/common/Loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "자취 꿀팁 게시판",
  description:
    "다양한 카테고리의 자취 꿀팁을 확인하고, 다른 사람들과 꿀팁을 공유하세요.",
  openGraph: {
    title: "자취 꿀팁 게시판",
    description:
      "다양한 카테고리의 자취 꿀팁을 확인하고, 다른 사람들과 꿀팁을 공유하세요.",
    url: "https://holo-psi.vercel.app/honeytips",
  },
};

const HoneyTipsPage = () => {
  return (
    <div className="mx-5 mt-5 pb-16 min-h-screen lg:relative lg:max-w-[762px] lg:pb-4 lg:mx-auto">
      <section>
        <div>
          <h1 className="common-title mb-4">꿀팁 게시판</h1>
        </div>
        <section className="mb-2">
          <SearchForm />
        </section>

        <section>
          <Suspense fallback={<Loading />}>
            <PostList />
          </Suspense>
        </section>
      </section>
    </div>
  );
};

export default HoneyTipsPage;
