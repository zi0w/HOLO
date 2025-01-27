import PolicyIcon from "@/assets/images/main/bnr/person-policy.png";
import TrashIcon from "@/assets/images/main/bnr/person-trash.png";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const PolicyAndTrashBanner = ({ isPolicy }: { isPolicy: boolean }) => {
  return (
    <div
      className={clsx(
        "m-5 flex items-end justify-between overflow-hidden rounded-[4px] lg:m-0 lg:h-full lg:flex-col lg:items-center lg:text-center",
        isPolicy ? "bg-primary-800" : "flex-row-reverse bg-primary-100",
      )}
    >
      <div className={clsx("mt-8 lg:m-0 lg:pt-8", isPolicy ? "ml-5" : "mr-5")}>
        <p
          className={clsx(
            "mb-5 break-keep font-gmarket text-lg lg:text-2xl",
            isPolicy ? "text-primary-50" : "text-primary-900",
          )}
        >
          {isPolicy ? (
            <>
              받고싶은 혜택 <br />
              청년정책
            </>
          ) : (
            <>
              종이박스를 <br />
              무슨 요일에 버리더라..
            </>
          )}
        </p>
        <Link
          href={isPolicy ? "/policy" : "/trash-guide"}
          className="mb-4 inline-block w-full whitespace-nowrap rounded-md bg-primary-500 px-5 py-2 text-center font-gmarket-light text-sm text-white lg:px-4 lg:w-auto"
        >
          {isPolicy ? "청년정책 알아보기" : "우리동네 쓰레기 정보"} &gt;
        </Link>
      </div>
      <Image
        src={isPolicy ? PolicyIcon : TrashIcon}
        alt="사람 아이콘"
        className={clsx(
          "object-contain lg:ml-0 lg:max-h-none lg:w-full lg:max-w-[290px]",
          isPolicy ? "max-h-[140px]" : "ml-7 max-w-[100px]",
          !isPolicy && "lg:h-[248px] lg:scale-x-[-1]",
        )}
      />
    </div>
  );
};

export default PolicyAndTrashBanner;
