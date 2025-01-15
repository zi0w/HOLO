"use client";

import LikeButton from "@/app/honeytips/[id]/_components/LikeButton";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { deletePost } from "@/app/honeytips/_utils/detail";
import MenuDots from "@/assets/images/honeytips/more-horizontal.svg";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type DetailCardProps = {
  postDetailData: Post;
};

const DetailCard = ({ postDetailData }: DetailCardProps) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태
  const router = useRouter();

  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY년 MM월 DD일 HH:mm:ss");
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getId();

      setCurrentId(userId);
    };
    dayjs.locale("ko");
    fetchUserId();
  }, []);

  const handleDeletePost = async (postId: Post["id"]) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await deletePost(postId);
      alert("게시물이 삭제되었습니다.");
      router.push("/honeytips");
    } catch (error) {
      alert("게시물 삭제 중 문제가 발생했습니다.");
      console.error("게시물 삭제에 실패했습니다.");
    }
  };

  return (
    <article className="mx-auto flex w-[362px] items-center justify-center">
      <section className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="my-6 text-xl font-bold">{postDetailData.title}</h1>
          {/* 현재 사용자 id === 포스트 작성자 id 일 때만 수정/삭제 버튼 보여주기 */}
          {currentId === postDetailData.user_id && (
            <div className="relative">
              <button
                className="text-base80 rounded-md py-1"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <MenuDots className="text-2xl text-gray-500" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-8 right-0 z-10 w-14 rounded-lg border">
                  <Link
                    href={`/honeytips/post?edit=${postDetailData.id}`}
                    className="block w-full px-2 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDeletePost(postDetailData.id)}
                    className="block w-full px-2 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-2 flex items-center px-2">
          <div className="flex items-center gap-2">
            {postDetailData.users?.profile_image_url && (
              <Image
                src={postDetailData.users.profile_image_url}
                alt={`${postDetailData.users.nickname}의 프로필 이미지`}
                width={100}
                height={100}
                className="h-11 w-11 rounded-full border-2"
              />
            )}
          </div>
          <div className="ml-3 flex flex-col">
            <p className="font-semibold">{postDetailData.users?.nickname}</p>
            <time className="text-xs text-gray-500">
              {formatDate(postDetailData.created_at)}
            </time>
          </div>
        </div>

        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          simulateTouch={true}
          grabCursor={true}
          centeredSlides={true}
          pagination={{ clickable: true }}
          navigation={true}
          className="mb-6 w-[362px]"
        >
          {postDetailData.post_image_url?.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Image
                src={imageUrl}
                alt={`게시물 이미지 ${index + 1}`}
                width={400}
                height={400}
                className="rounded-lg object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="mb-8 whitespace-pre-wrap px-2">
          {postDetailData.content}
        </p>
        {/* 좋아요 버튼 */}
        {currentId && <LikeButton postDetailData={postDetailData} />}
      </section>
    </article>
  );
};

export default DetailCard;
