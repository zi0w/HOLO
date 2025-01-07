import PostList from "@/app/honeytips/_components/PostList";
import SearchForm from "@/app/honeytips/_components/SearchForm";

const HoneyTipsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">꿀팁 게시판</h1>
          <p className="mt-2 text-gray-600">
            다양한 카테고리의 자취 꿀팁을 확인하세요!
          </p>
        </div>
        <div className="mb-6 flex items-center justify-center">
          <SearchForm />
        </div>
        <div>
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default HoneyTipsPage;
