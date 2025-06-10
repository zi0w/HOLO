import SmallComment from "@/assets/images/honeytips/comment.svg";
import SmallDot from "@/assets/images/honeytips/dot.svg";
import SmallHeart from "@/assets/images/honeytips/heart.svg";

const BestPostLoading = () => {
  return (
    <div className="relative mx-5 lg:mx-auto lg:mt-4 lg:max-w-[358px]">
      <h2 className="common-title !text-[22px]">꿀팁 게시판</h2>
      <div className="mt-4 flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative flex animate-pulse flex-col gap-5 rounded-lg border border-base-300 p-5 lg:min-w-[358px]"
          >
            <div className="flex w-full items-start gap-3">
              <div className="flex w-full flex-col space-y-3">
                <div className="h-4 w-1/3 rounded bg-gray-300" />
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-4 w-2/3 rounded bg-gray-300" />
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
  );
};

export default BestPostLoading;
