"use client";

const SkeletonMap = () => {
  return (
    <div className="flex h-full w-full animate-pulse items-center justify-center rounded bg-base-200">
      <p className="text-sm text-gray-500">지도를 불러오는 중...</p>
    </div>
  );
};

export default SkeletonMap;
