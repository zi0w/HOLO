import LogoIcon from "@/assets/images/common/logo.png";
import Banner from "@/assets/images/main/bnr/bnr-person.png";
import Image from "next/image";

const MainBnr = () => {
  return (
    <div className="relative mx-5 mb-10 flex justify-between rounded bg-primary-100 pl-5 pr-3">
      <div className="mt-6 mb-8 whitespace-nowrap">
        <p className="mb-1 text-primary-900">1인가구를 위한 정보 제공 서비스</p>
        <p className="flex items-center gap-1 font-gmarket text-2xl text-primary-600">
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
        alt="배너 이미지"
        className="absolute bottom-0 right-2 max-w-[145px] object-contain"
      />
    </div>
  );
};

export default MainBnr;
