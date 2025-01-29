import Logo from "@/assets/images/common/logo.png";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="lg:z-50 fixed left-0 top-0 z-20 w-full bg-white py-[18px] text-center lg:static lg:w-[100px] lg:bg-transparent lg:p-0">
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
