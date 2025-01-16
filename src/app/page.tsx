import BestPostList from "@/components/main/BestPostList";
import GuideBnr from "@/components/main/GuideBnr";

import Banner from "@/assets/images/main/bnr/banner.png";
import Map from "@/components/main/Map";
import Image from "next/image";
const Home = () => {
  return (
    <div>
      <div className="mx-5 bg-primary-100">
        <Image
          src={Banner}
          width={362}
          height={124}
          alt="배너 이미지"
          className="mx-auto my-3"
        />
      </div>
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
