import MainHeader from "@/components/common/MainHeader";
import BestPostList from "@/components/main/BestPostList";
import MainBanner from "@/components/main/MainBanner";
import Map from "@/components/main/Map";
import PolicyAndTrashBanner from "@/components/main/PolicyAndTrashBanner";

const Home = () => {
  return (
    <div className="mt-[70px] pb-[83px] lg:mx-auto lg:mt-10 lg:max-w-[979px] lg:pb-11">
      <div className="lg:hidden">
        <MainHeader />
      </div>
      <MainBanner />
      <div className="lg:grid lg:grid-cols-[597px_auto] lg:justify-between lg:gap-4">
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full">
          <BestPostList />
        </div>
        <div className="lg:col-start-1 lg:row-start-2 lg:mt-auto lg:flex lg:gap-6">
          {/* 정책 배너 */}
          <div className="lg:flex-1">
            <PolicyAndTrashBanner isPolicy={true} />
          </div>
          {/* 쓰레기 배너 */}
          <div className="lg:flex-1">
            <PolicyAndTrashBanner isPolicy={false} />
          </div>
        </div>
        <div className="mt-8 lg:col-start-1 lg:row-start-1 lg:mt-0">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Home;
