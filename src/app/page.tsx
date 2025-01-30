import MainHeader from "@/components/common/MainHeader";
import BestPostList from "@/components/main/BestPostList";
import PolicyAndTrashBanner from "@/components/main/PolicyAndTrashBanner";

import DailyFortune from "@/components/main/DailyFortune";
import DailyMenu from "@/components/main/DailyMenu";
import MainBanner from "@/components/main/MainBanner";
import Map from "@/components/main/Map";

const Home = () => {
  return (
    <div className="mt-[70px] lg:mx-auto lg:mt-10 lg:max-w-[979px]">
      <div className="lg:hidden">
        <MainHeader />
      </div>
      <MainBanner />
      <div className="lg:mb-10 lg:grid lg:grid-cols-[597px_auto] lg:gap-4">
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full">
          <BestPostList />
        </div>
        <div className="lg:col-start-1 lg:row-start-1">
          <Map />
        </div>
        <div className="lg:col-start-1 lg:row-start-2 lg:flex lg:gap-6 lg:mt-auto">
          {/* 정책 배너 */}
          <div className="lg:flex-1">
            <PolicyAndTrashBanner isPolicy={true} />
          </div>
          {/* 쓰레기 배너 */}
          <div className="lg:flex-1">
            <PolicyAndTrashBanner isPolicy={false} />
          </div>
        </div>
      </div>
      <DailyMenu />
      <DailyFortune />
    </div>
  );
};

export default Home;
