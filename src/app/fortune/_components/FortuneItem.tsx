"use client";

import Fortune1 from "@/assets/images/fortune/fortune1.png";
import Fortune2 from "@/assets/images/fortune/fortune2.png";
import Fortune3 from "@/assets/images/fortune/fortune3.png";
import Fortune4 from "@/assets/images/fortune/fortune4.png";
import Fortune5 from "@/assets/images/fortune/fortune5.png";
import Fortune6 from "@/assets/images/fortune/fortune6.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fortuneImages = [
  Fortune1,
  Fortune2,
  Fortune3,
  Fortune4,
  Fortune5,
  Fortune6,
];

const FortuneItem = () => {
    const router = useRouter();
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  
    const handleClick = (index: number) => {
      if (clickedIndex !== null) return; // 중복 실행 방지
      setClickedIndex(index);
  
      setTimeout(() => {
        router.push("/fortune/result"); 
      }, 1200); 
    };
  
    return (
      <>
        {fortuneImages.map((src, index) => (
          <div key={index} onClick={() => handleClick(index)} className="cursor-pointer">
            {/* 배경 따로 감싸기 (hover 시 배경만 변경) */}
            <div className="rounded-full hover:bg-[#ffd1a3] transition">
              <motion.div
                animate={
                  clickedIndex === index
                    ? { y: [0, -12, 0, -10, 0, -8, 0], scale: [1, 1.15, 0.9, 1.1, 0.95, 1.05, 1] }
                    : {} // 클릭되지 않은 포춘쿠키는 애니메이션 X
                }
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  repeat: 2, // 3번 반복(기본 1)
                }}
              >
                <Image
                  src={src}
                  alt={`fortune-${index + 1}`}
                  width={160}
                  height={160}
                  className="rounded-full"
                />
              </motion.div>
            </div>
          </div>
        ))}
      </>
    );
  };

export default FortuneItem;
