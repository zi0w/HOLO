import MainHeader from "@/components/common/MainHeader";
import BestPostList from "@/components/main/BestPostList";
import PolicyAndTrashBnr from "@/components/main/PolicyAndTrashBnr";

import MainBnr from "@/components/main/MainBnr";
import Map from "@/components/main/Map";

const Home = () => {
  return (
    <div className="mt-[70px]">
      <MainHeader />
      <MainBnr />
      <Map />
      {/* 정책 배너 */}
      <PolicyAndTrashBnr isPolicy={true} />
      {/* 쓰레기 배너 */}
      <PolicyAndTrashBnr isPolicy={false} />
      <BestPostList />
    </div>
  );
};

export default Home;
