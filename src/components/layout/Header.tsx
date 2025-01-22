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
        "flex flex-col items-center justify-between",
        isActive && "text-primary-500",
      )}
    >
      <Icon className={clsx("mb-1", isActive && "text-primary-500")} />
      {label}
    </Link>
  );
};

const Header = ({ allHidden }: { allHidden: boolean }) => {
  return (
    <header
      className={clsx(
        "fixed bottom-0 z-20 w-full lg:left-0 lg:top-0 lg:h-screen lg:w-[240px] lg:bg-primary-50",
        allHidden && "hidden",
      )}
    >
      <nav className="flex justify-between border-t border-base-200 bg-white px-5 py-2 text-xs text-base-700 lg:h-full lg:flex-col lg:justify-center lg:gap-10 lg:border-r lg:border-t-0 lg:p-5">
        {NAVIGATION_PATHS.map((navItem) => (
          <NavLink key={navItem.path} {...navItem} />
        ))}
        <HeaderAuthLink />
      </nav>
    </header>
  );
};

export default Header;
