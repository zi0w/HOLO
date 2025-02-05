"use client";

const ProfileSkeleton = () => {
  return (
    <div className="mb-16 w-full bg-white pt-12 lg:pt-6">
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center px-5 pt-[5px] lg:px-0 lg:pl-[calc(50vw-400px)]">
          <h1 className="common-title text-2xl font-medium leading-8 text-base-800">
            마이페이지
          </h1>
        </div>

        {/* 프로필 이미지 스켈레톤 */}
        <div className="relative mt-12 h-32 w-32">
          <div className="h-[128px] w-[128px] animate-pulse rounded-full bg-gray-200"></div>
          <div className="absolute bottom-0 right-0 h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
        </div>

        {/* 닉네임 스켈레톤 */}
        <div className="mt-4 h-6 w-32 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="my-4 w-[100%-40px] border-b-2 border-gray-200"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
