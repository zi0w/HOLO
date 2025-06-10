import SmallComment from "@/assets/images/honeytips/comment.svg";
import SmallDot from "@/assets/images/honeytips/dot.svg";
import SmallHeart from "@/assets/images/honeytips/heart.svg";

const PostCardLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="lg:flex lg:gap-6">
        <div className="flex flex-col gap-4 lg:gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative flex animate-pulse flex-col gap-5 rounded-lg border border-base-300 p-5 lg:w-[369px]"
            >
              <div className="flex w-full items-start gap-3">
                <div className="flex w-full flex-col space-y-3">
                  <div className="h-4 w-1/3 rounded bg-gray-300" />
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-4 w-2/3 rounded bg-gray-300"
                    />
                  ))}
                </div>
                <div className="h-[103px] w-[103px] flex-shrink-0 rounded bg-gray-300" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gray-300" />
                    <div className="h-4 w-8 rounded bg-gray-300" />
                    <SmallDot />
                    <div className="h-4 w-8 rounded bg-gray-300" />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-base-600">
                  <div className="flex items-center gap-1">
                    <SmallHeart />
                    <div className="h-3 w-3 rounded bg-gray-300" />
                  </div>
                  <div className="flex items-center gap-1">
                    <SmallComment />
                    <div className="h-3 w-3 rounded bg-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative flex animate-pulse flex-col gap-5 rounded-lg border border-base-300 p-5 lg:w-[369px]"
              >
                <div className="flex w-full items-start gap-3">
                  <div className="flex w-full flex-col space-y-3">
                    <div className="h-4 w-1/3 rounded bg-gray-300" />
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-4 w-2/3 rounded bg-gray-300"
                      />
                    ))}
                  </div>
                  <div className="h-[103px] w-[103px] flex-shrink-0 rounded bg-gray-300" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-gray-300" />
                      <div className="h-4 w-8 rounded bg-gray-300" />
                      <SmallDot />
                      <div className="h-4 w-8 rounded bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-base-600">
                    <div className="flex items-center gap-1">
                      <SmallHeart />
                      <div className="h-3 w-3 rounded bg-gray-300" />
                    </div>
                    <div className="flex items-center gap-1">
                      <SmallComment />
                      <div className="h-3 w-3 rounded bg-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardLoading;
