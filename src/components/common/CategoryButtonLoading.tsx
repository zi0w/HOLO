const CategoryButtonLoading = () => {
  return (
    <>
      {/* 페이지 제목 스켈레톤 */}
      <div className="mx-5 my-4 h-6 w-32 animate-pulse rounded bg-gray-200 lg:mx-0"></div>

      {/* 버튼 카테고리 컨테이너 스켈레톤 */}
      <div className="mx-5 flex gap-2 overflow-x-auto lg:m-0 lg:mx-0 lg:gap-2 [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-12 w-16 animate-pulse rounded bg-gray-200 lg:h-14 lg:w-16"
          ></div>
        ))}
      </div>

      {/* 하단 구분선 스켈레톤 */}
      <div className="my-4 border-b-2 border-gray-200"></div>
    </>
  );
};

export default CategoryButtonLoading;
