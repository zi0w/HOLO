import LogoIcon from "@/assets/images/common/logo.png";
import BannerPcLeft from "@/assets/images/main/bnr/bnr-person.png";
import Banner from "@/assets/images/main/bnr/bnr-person2.png";
import Image from "next/image";

const MainBanner = () => {
  return (
    <div className="relative mx-5 mb-10 flex justify-between rounded bg-primary-100 pl-5 pr-3 lg:justify-center lg:p-0 lg:h-[120px] lg:overflow-hidden">
      <Image
        src={BannerPcLeft}
        alt="배너 이미지"
        width={100}
        height={100}
        className="hidden max-w-[100px] lg:block object-contain mt-auto mr-8"
      />
      <div className="mb-8 mt-6 whitespace-nowrap lg:my-auto lg:flex lg:items-center lg:gap-2">
        <p className="mb-1 font-gmarket text-primary-900 lg:mb-0 lg:font-gmarket-bold lg:text-[22px]">
          1인가구를 위한 정보 제공 서비스
        </p>
        <p className="flex items-center gap-1 font-gmarket-bold text-2xl text-primary-600 lg:text-2xl">
          나{" "}
          <Image
            src={LogoIcon}
            alt="로고 아이콘"
            className="max-w-[99px] object-contain"
          />{" "}
          산다!
        </p>
      </div>
      <Image
        src={Banner}
        alt="배너 이미지2"
        className="absolute bottom-0 right-2 max-w-[135px] object-contain lg:static lg:mt-auto lg:max-w-[145px]"
      />
    </div>
  );
};

export default MainBanner;
