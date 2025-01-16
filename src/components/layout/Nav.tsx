import { NAVIGATION_PATHS } from "@/constants/navigation";
import clsx from "clsx";
import Link from "next/link";

const Nav = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <nav
      className={clsx(
        "lg:pb-19 fixed bottom-0 left-0 z-10 flex h-[60px] w-full justify-around border-t border-t-gray-500 bg-white p-5 text-sm font-bold lg:static lg:mb-auto lg:mt-[100px] lg:h-auto lg:flex-col lg:items-center lg:gap-7 lg:border-b lg:border-t-0 lg:border-gray-500 lg:bg-primary-50 lg:p-0 lg:pb-10 lg:text-center lg:text-xl",
        isMobile && "lg:hidden",
      )}
    >
      {NAVIGATION_PATHS.map(({ path, label }) => (
        <Link key={path} href={path}>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
