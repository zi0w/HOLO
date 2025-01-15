import PolicyIcon from "@/assets/images/main/bnr/person-policy.png";
import TrashIcon from "@/assets/images/main/bnr/person-trash.png";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const GuideBnr = ({ isPolicy }: { isPolicy: boolean }) => {
  return (
    <div
      className={clsx(
        "m-5 flex items-end justify-between rounded-3xl overflow-hidden",
        isPolicy ? "bg-primary-800" : "flex-row-reverse bg-primary-100",
      )}
    >
      <div className={clsx("mt-8", isPolicy ? "ml-5" : "mr-5")}>
        <p
          className={clsx(
            "font-gmarket mb-5 text-lg",
            isPolicy ? "text-primary-100" : "text-primary-900",
          )}
        >
          {isPolicy ? (
            <>
              받고싶은 혜택 <br className="block md:hidden" />
              청년정책
            </>
          ) : (
            <>
              계란껍질이 <br className="block md:hidden" />
              음식물 쓰레기던가..
            </>
          )}
        </p>
        <Link
          href={isPolicy ? "/policy" : "/trash-guide"}
          className="mb-4 inline-block rounded-md bg-primary-500 px-5 py-2 text-sm text-white whitespace-nowrap"
        >
          {isPolicy ? "청년정책 알아보기" : "우리동네 쓰레기 정보"} &gt;
        </Link>
      </div>
      <Image
        src={isPolicy ? PolicyIcon : TrashIcon}
        alt="사람 아이콘"
        className="object-contain"
      />
    </div>
  );
};

export default GuideBnr;
