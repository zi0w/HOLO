import ArrowLeftIcon from "@/assets/images/common/arrow-left-icon.svg";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

const NavigateBack = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hiddenPage =
    pathname === "/" || pathname === "/honeytips/post" || pathname === "/map";

  const handleBack = () => {
    if (pathname === "/recommend") {
      router.push("/");
    } else if (
      pathname.startsWith("/recommend/menu") ||
      pathname.startsWith("/recommend/fortune")
    ) {
      router.push("/recommend");
    } else {
      router.back();
    }
  };

  return (
    <div className={clsx("p-5", hiddenPage && "hidden")}>
      <button onClick={handleBack}>
        <ArrowLeftIcon />
      </button>
    </div>
  );
};

export default NavigateBack;
