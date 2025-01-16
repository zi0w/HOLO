import Logo from "@/assets/images/common/logo.png";
import Image from "next/image";
import Link from "next/link";

const MainHeader = () => {
  return (
    <div className="fixed left-0 top-0 z-10 flex w-full justify-between bg-primary-50 p-5 lg:static lg:justify-center lg:bg-transparent lg:p-0">
      <Link
        href="/"
        className="relative h-5 w-full max-w-16 lg:h-[50px] lg:max-w-[100px]"
      >
        <Image src={Logo} fill={true} className="object-contain" alt="로고" />
      </Link>
    </div>
  );
};

export default MainHeader;
