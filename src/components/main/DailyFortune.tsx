import Fortune from "@/assets/images/fortune/fortune-main.png";
import Image from "next/image";
import Link from "next/link";

const DailyFortune = () => {
  return (
    <Link href="/fortune">
      <div className="mx-5 mb-[97px] mt-10 flex h-24 items-center justify-around rounded-lg bg-primary-700">
        <Image src={Fortune} alt="fortune-cookie" width={107} height={77} />
        <div className="flex flex-col justify-center">
          <p className="font-gmarket text-lg text-primary-50">
            오늘의 운세? <br /> 포춘쿠키를 뽑아보세요!
          </p>
        </div>
      </div>
    </Link>
  );
};
export default DailyFortune;
