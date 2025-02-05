"use client";

const ContentSkeletion = () => {
  return (
    <>
      <div className="mx-5 mt-8 h-[440px] w-[100%-40px] flex-shrink-0 rounded border border-base-300 bg-white pt-2.5 lg:mx-auto lg:mt-4 lg:flex lg:h-[440px] lg:w-[548px] lg:items-center">
        <div className="relative h-full w-full flex-col">
          <div className="flex-1 space-y-4 px-4 py-5">
            {/* 스켈레톤 리스트 아이템 3개 */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-16 w-full animate-pulse rounded-lg bg-gray-200"
              ></div>
            ))}
          </div>
        </div>
        {/* 버튼 */}
      </div>
      <div className="mx-5 mt-5 flex flex-col lg:mx-auto lg:flex-row lg:items-center lg:justify-center lg:gap-2">
        <div className="h-10 w-44 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-10 w-44 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
    </>
  );
};

export default ContentSkeletion;
