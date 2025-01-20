import Logo from "@/assets/images/common/logo.png";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="fixed left-0 top-0 z-20 w-full bg-white py-[18px] text-center lg:left-[60px] lg:top-10 lg:w-[100px] lg:p-0 lg:bg-transparent">
      <Link
        href="/"
        className="relative inline-block h-[25px] w-[70px] lg:h-[50px] lg:w-[100px]"
      >
        <Image src={Logo} fill={true} className="object-contain" alt="로고" />
      </Link>
    </div>
  );
};

export default MainHeader;
