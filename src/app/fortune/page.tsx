import Fortune1 from "@/assets/images/fortune/fortune1.png";
import Fortune2 from "@/assets/images/fortune/fortune2.png";
import Fortune3 from "@/assets/images/fortune/fortune3.png";
import Fortune4 from "@/assets/images/fortune/fortune4.png";
import Fortune5 from "@/assets/images/fortune/fortune5.png";
import Fortune6 from "@/assets/images/fortune/fortune6.png";
import Image from "next/image";
import Link from "next/link";

const fortuneImages = [
  Fortune1,
  Fortune2,
  Fortune3,
  Fortune4,
  Fortune5,
  Fortune6,
];

const fortunePage = () => {
  return (
    <div className="mt-5 flex h-full flex-col items-center bg-white">
      <h1 className="text-center text-2xl text-base-800">
        오늘의 운세를 <br />
        알려줄 포춘쿠키는?
      </h1>
      <span className="mt-1.5 text-center text-base text-primary-800">
        직감적으로! 하나만 골라보세요 :)
      </span>
      <div className="mt-10 grid grid-cols-2 gap-4">
        {fortuneImages.map((src, index) => (
          <Link href="/fortune/result" key={index}>
            <Image
              src={src}
              alt={`fortune-${index + 1}`}
              width={160}
              height={160}
              className="hover:bg-[#ffd1a3] rounded-full"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default fortunePage;
