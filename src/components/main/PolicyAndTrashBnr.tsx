import PolicyIcon from "@/assets/images/main/bnr/person-policy.png";
import TrashIcon from "@/assets/images/main/bnr/person-trash.png";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const PolicyAndTrashBnr = ({ isPolicy }: { isPolicy: boolean }) => {
  return (
    <div
      className={clsx(
        "m-5 flex items-end justify-between overflow-hidden rounded-3xl",
        isPolicy ? "bg-primary-800" : "flex-row-reverse bg-primary-100",
      )}
    >
      <div className={clsx("mt-8", isPolicy ? "ml-5" : "mr-5")}>
        <p
          className={clsx(
            "mb-5 font-gmarket text-lg",
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
              종이박스를 <br className="block md:hidden" />
              무슨 요일에 버리더라..
            </>
          )}
        </p>
        <Link
          href={isPolicy ? "/policy" : "/trash-guide"}
          className="mb-4 inline-block w-full whitespace-nowrap rounded-md bg-primary-500 px-5 py-2 text-center text-sm text-white"
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

export default PolicyAndTrashBnr;
