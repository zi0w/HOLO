"use client";

import LikeButton from "@/app/honeytips/[id]/_components/LikeButton";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { deletePost } from "@/app/honeytips/_utils/detail";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import { getId } from "@/app/honeytips/_utils/auth";

type DetailCardProps = {
  data: Post;
};

const DetailCard = ({ data }: DetailCardProps) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const router = useRouter();

  const categories = ["청소", "요리", "문화", "기타"];

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
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-4">
        <div className="my-8 flex justify-center space-x-4">
          {categories.map((category) => (
            <span
              key={category}
              className={`rounded px-4 py-2 text-sm font-semibold transition-colors ${
                data.categories === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between px-2">
          <h1 className="my-6 text-2xl font-bold">{data.title}</h1>
          {/* 좋아요 버튼 */}
          <LikeButton postId={data.id} />
        </div>

        <div className="mb-7 flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            {data.users?.profile_image_url && (
              <Image
                src={data.users.profile_image_url}
                alt={`${data.users.nickname}의 프로필 이미지`}
                width={100}
                height={100}
                className="h-14 w-14 rounded-full border-2"
              />
            )}
            <p>{data.users?.nickname}</p>
          </div>
          <p className="text-xs text-gray-500">{formatDate(data.created_at)}</p>
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
          className="mb-6 w-[300px]"
        >
          {data.post_image_url?.map((imageUrl, index) => (
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

        <p className="whitespace-pre-wrap px-2">{data.content}</p>

        {/* 현재 사용자 id === 포스트 작성자 id 일 때만 수정/삭제 버튼 보여주기 */}
        {currentId === data.user_id && (
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href={`/honeytips/update/${data.id}`}
              className="rounded-md bg-blue-500 px-3 py-1.5 text-white transition-colors hover:bg-blue-600"
            >
              수정
            </Link>
            <button
              type="button"
              onClick={() => handleDeletePost(data.id)}
              className="rounded-md bg-red-500 px-3 py-1.5 text-white transition-colors hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
