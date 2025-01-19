import MainHeader from "@/components/common/MainHeader";
import BestPostList from "@/components/main/BestPostList";
import PolicyAndTrashBanner from "@/components/main/PolicyAndTrashBanner";

import MainBanner from "@/components/main/MainBanner";
import Map from "@/components/main/Map";
import DailyMenu from "@/components/main/DailyMenu";
import DailyFortune from "@/components/main/DailyFortune";

const Home = () => {
  return (
    <div className="mt-[70px]">
      <MainHeader />
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
