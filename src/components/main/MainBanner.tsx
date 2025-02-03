"use client";
import LogoIcon from "@/assets/images/common/logo.png";
import BannerPcLeft from "@/assets/images/main/bnr/bnr-person.png";
import Banner from "@/assets/images/main/bnr/bnr-person2.png";
import FortuneCookie from "@/assets/images/main/top-banner-2.png";
import RecommendPcLeft from "@/assets/images/main/top-banner-3_1.png";
import RecommendPcRight from "@/assets/images/main/top-banner-3_2.png";
import RecommendMoIcon from "@/assets/images/main/top-banner-3_mo.png";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MainBanner = () => {
  return (
    <div className="mx-5 mb-8 lg:mx-0">
      <Swiper
        pagination={{
          type: "fraction",
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mainBannerSwiper"
      >
        <SwiperSlide className="relative flex justify-between bg-primary-100 lg:justify-center lg:overflow-hidden">
          <Image
            src={BannerPcLeft}
            alt="배너 이미지"
            width={100}
            height={100}
            className="mr-8 mt-auto hidden max-w-[100px] object-contain lg:block"
          />
          <div className="mb-8 ml-5 mt-6 whitespace-nowrap lg:my-auto lg:flex lg:flex-col-reverse lg:items-center lg:gap-2">
            <p className="mb-1 font-gmarket text-primary-900 lg:mb-0 lg:font-gmarket-bold lg:text-[22px]">
              1인가구를 위한 정보 제공 서비스
            </p>
            <p className="flex items-center gap-1 font-gmarket-bold text-2xl text-primary-600 lg:text-2xl">
              나{" "}
              <Image
                src={LogoIcon}
                alt="로고 아이콘"
                className="max-w-[99px] object-contain"
              />{" "}
              산다!
            </p>
          </div>
          <Image
            src={Banner}
            alt="배너 이미지2"
            className="absolute bottom-0 right-2 max-w-[135px] object-contain lg:static lg:ml-8 lg:mt-auto lg:max-w-[145px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex w-full items-center bg-primary-50">
            <Image
              src={RecommendPcLeft}
              alt="칼국수 사진"
              width={281}
              height={120}
              className="hidden object-contain lg:block"
            />
            <Image
              src={RecommendPcRight}
              alt="김치찌개 사진"
              width={283}
              height={120}
              className="hidden object-contain lg:block"
            />
            <div className="m-auto text-center">
              <p className="font-gmarket-bold text-lg text-primary-800 lg:text-2xl">
                오늘의 메뉴! <br className="lg:hidden" />
                추천해드려요!
              </p>
              <Link
                href={"recommend"}
                className="mx-auto mt-2 flex max-w-[132px] items-center justify-center rounded bg-primary-500 py-[6px] font-gmarket-light text-xs text-white"
              >
                메뉴 추천 받기 &gt;
              </Link>
            </div>
            <Image
              src={RecommendMoIcon}
              alt="음식 사진"
              width={200}
              height={120}
              className="max-w-[200px] object-contain lg:hidden"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex w-full items-center justify-center bg-primary-700 lg:gap-6">
            <Image src={FortuneCookie} alt="포츈쿠키" width={107} height={77} />
            <div className="text-center">
              <p className="font-gmarket-bold text-lg text-primary-50 lg:text-2xl">
                오늘의 운세? <br className="lg:hidden" />
                포춘쿠키를 뽑아보세요!
              </p>
              <Link
                href={"/fortune"}
                className="mx-auto mt-2 flex max-w-[132px] items-center justify-center rounded bg-primary-500 py-[6px] font-gmarket-light text-xs text-white"
              >
                포춘쿠키 뽑아보기 &gt;
              </Link>
            </div>
            <Image
              src={FortuneCookie}
              alt="포츈쿠키"
              width={107}
              height={77}
              className="hidden -scale-x-100 lg:block"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainBanner;
