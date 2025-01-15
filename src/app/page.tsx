import BestPostList from "@/app/honeytips/_components/BestPostList";
import GuideBnr from "@/components/main/GuideBnr";

import Map from "@/components/main/Map";

const Home = () => {
  return (
    <div>
      <Map />
      {/* 정책 배너 */}
      <GuideBnr isPolicy={true} />
      {/* 쓰레기 배너 */}
      <GuideBnr isPolicy={false} />
      <BestPostList />
    </div>
  );
};

export default Home;
