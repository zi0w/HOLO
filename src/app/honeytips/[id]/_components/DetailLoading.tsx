"use client";

const DetailLoading = () => {
  return (
    <div className="mx-5 mt-5">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-[42px] w-[42px] animate-pulse rounded-full bg-gray-300"></div>
            <div className="ml-3 flex flex-col space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>
        </div>
        <div className="mx-auto mb-4 h-[300px] w-[300px] animate-pulse rounded-lg bg-gray-300"></div>
        <div className="h-5 w-1/2 animate-pulse rounded bg-gray-300"></div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-300"></div>
        <div className="h-4 w-4/6 animate-pulse rounded bg-gray-300"></div>
        <div className="flex flex-col gap-2">
          <div className="mx-auto h-[42px] w-[42px] animate-pulse rounded-full bg-gray-300"></div>
          <div className="mx-auto mb-2 h-4 w-4 animate-pulse rounded bg-gray-300"></div>
        </div>
        <div className="h-5 w-20 animate-pulse rounded bg-gray-300"></div>
      </section>
      <section className="mt-4">
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
    </div>
  );
};

export default DetailLoading;
