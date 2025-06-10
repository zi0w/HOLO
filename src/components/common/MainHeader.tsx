import Logo from "@/assets/images/common/logo.png";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="fixed left-0 top-0 z-20 w-full bg-white py-[18px] text-center lg:static lg:z-50 lg:w-[100px] lg:bg-transparent lg:p-0">
      <Link href="/" className="relative inline-block">
        <Image
          src={Logo}
          className="h-[25px] w-[70px] object-contain lg:h-[50px] lg:w-[100px]"
          alt="로고"
        />
      </Link>
    </div>
  );
};

export default MainHeader;
