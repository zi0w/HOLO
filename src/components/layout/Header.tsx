import MainHeader from "@/components/common/MainHeader";
import HeaderAuthLink from "@/components/layout/HeaderAuthLink";
import { NAVIGATION_PATHS } from "@/constants/navigation";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const isActiveLink = (pathname: string, path: string) => {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
};

const NavLink = ({ path, label, icon: Icon }: (typeof NAVIGATION_PATHS)[0]) => {
  const pathname = usePathname();
  const isActive = isActiveLink(pathname, path);

  return (
    <Link
      href={path}
      className={clsx(
        "flex flex-col items-center justify-between lg:items-start lg:text-lg",
        isActive && "font-gmarket-bold text-primary-500",
        !isActive && "font-gmarket text-base-800",
      )}
    >
      <Icon
        className={clsx("mb-1 lg:hidden", isActive && "text-primary-500")}
      />
      {label}
    </Link>
  );
};

const Header = ({ allHidden }: { allHidden: boolean }) => {
  return (
    <header
      className={clsx(
        "fixed bottom-0 z-20 w-full bg-white lg:left-0 lg:top-0 lg:h-screen lg:w-[254px] lg:border-r lg:border-base-200 lg:z-0",
        allHidden && "hidden",
      )}
    >
      <div className="hidden lg:block lg:pb-14 lg:pl-14 lg:pt-12">
        <MainHeader />
      </div>
      <nav className="flex justify-between border-t border-base-200 bg-white px-5 py-2 pb-[calc(env(safe-area-inset-bottom)+15px)] text-xs text-base-700 lg:h-full lg:flex-col lg:justify-normal lg:gap-8 lg:border-none lg:p-5 lg:px-14">
        {NAVIGATION_PATHS.map((navItem) => (
          <NavLink key={navItem.path} {...navItem} />
        ))}
        <HeaderAuthLink />
      </nav>
    </header>
  );
};

export default Header;
