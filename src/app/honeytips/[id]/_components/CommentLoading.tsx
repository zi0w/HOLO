const CommentLoading = () => {
  return (
    <section className="mt-4 mx-5 lg:mx-auto lg:max-w-[762px]">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex animate-pulse items-center space-x-4"
          >
            <div className="h-[50px] w-[50px] rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 w-1/3 rounded bg-gray-300"></div>
              <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center space-x-2 rounded">
        <div className="h-7 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
    </section>
  );
};

export default CommentLoading;
