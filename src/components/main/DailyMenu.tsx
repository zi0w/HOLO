import Kalguksu from "@/assets/images/recommend/kalguksu.png";
import KimchiSoup from "@/assets/images/recommend/kimchi-soup.png";
import Image from "next/image";
import Link from "next/link";

const DailyMenu = () => {
  return (
    <div className="relative mx-5">
      <h2 className="text-[22px] font-bold text-base-800">오늘 점심은?</h2>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <Image src={Kalguksu} alt="kalguksu" width={172} height={168} />
          <div className="flex h-11 w-[172px] items-center justify-center rounded-b-lg bg-white">
            <span className="mt-2 text-base font-medium text-base-800">
              시원한 칼국수
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Image src={KimchiSoup} alt="kimchi-soup" width={172} height={168} />
          <div className="flex h-11 w-[172px] items-center justify-center rounded-b-lg bg-white">
            <span className="mt-2 text-base font-medium text-base-800">
              얼큰한 김치찌개
            </span>
          </div>
        </div>
      </div>
      <div>
        <Link href="/recommend" className="flex justify-center mt-4 text-sm text-primary-500">
          메뉴 추천 받으러 가기
        </Link>
      </div>
    </div>
  );
};
export default DailyMenu;
