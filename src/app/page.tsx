import MainHeader from "@/components/common/MainHeader";
import BestPostList from "@/components/main/BestPostList";
import PolicyAndTrashBanner from "@/components/main/PolicyAndTrashBanner";

import DailyFortune from "@/components/main/DailyFortune";
import DailyMenu from "@/components/main/DailyMenu";
import MainBanner from "@/components/main/MainBanner";
import Map from "@/components/main/Map";

const Home = () => {
  return (
    <div className="mt-[70px]">
      <div className="lg:hidden">
        <MainHeader />
      </div>
      <MainBanner />
      <Map />
      {/* 정책 배너 */}
      <PolicyAndTrashBanner isPolicy={true} />
      {/* 쓰레기 배너 */}
      <PolicyAndTrashBanner isPolicy={false} />
      <BestPostList />
      <DailyMenu />
      <DailyFortune />
    </div>
  );
};

export default Home;
