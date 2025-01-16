"use client";

import LikeButton from "@/app/honeytips/[id]/_components/LikeButton";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { deletePost, fetchPostDetail } from "@/app/honeytips/_utils/detail";
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
  postId: Post["id"];
};

const DetailCard = ({ postId }: DetailCardProps) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [postDetailData, setPostDetailData] = useState<Post | null>(null);
  const [likesCounts, setLikesCounts] = useState<number>(0);
  const router = useRouter();

  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY년 MM월 DD일 HH:mm:ss");
  };

  useEffect(() => {
    const fetchPostDetailData = async () => {
      const postDetailData = await fetchPostDetail(postId);
      setPostDetailData(postDetailData);
      setLikesCounts(postDetailData!.likes[0].count);
    };
    fetchPostDetailData();
  }, []);

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

  if (!postDetailData) return <p className="mx-auto flex h-[200px] items-center justify-center text-base-400">로딩중...</p>;

  return (
    <section className="mx-5 py-[10px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            {postDetailData.users.profile_image_url && (
              <Image
                src={postDetailData.users.profile_image_url}
                alt={`${postDetailData.users.nickname}의 프로필 이미지`}
                width={100}
                height={100}
                className="h-[42px] w-[42px] rounded-full"
              />
            )}
          </div>
          <div className="ml-3 flex flex-col">
            <p className="text-[14px] text-base-800">
              {postDetailData.users.nickname}
            </p>
            <time className="text-[14px] text-base-800">
              {formatDate(postDetailData.created_at)}
            </time>
          </div>
        </div>

        {currentId === postDetailData.user_id && (
          <div className="relative">
            <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <MenuDots />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-6 z-10 w-[68px] rounded-lg border bg-white py-2">
                <Link
                  href={`/honeytips/post?edit=${postDetailData.id}`}
                  className="block w-full px-5 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                >
                  수정
                </Link>
                <button
                  onClick={() => handleDeletePost(postDetailData.id)}
                  className="block w-full px-5 py-2 text-center text-sm text-base-800 hover:bg-primary-100 hover:text-primary-500"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        )}
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
        className="mb-4 mt-2 h-auto max-w-[362px]"
      >
        {postDetailData.post_image_url?.map((imageUrl, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={imageUrl}
              alt={`게시물 이미지 ${index + 1}`}
              width={400}
              height={400}
              className="rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="font-bold text-base-900">{postDetailData.title}</p>

      <p className="mb-10 mt-2 whitespace-pre-wrap text-base-800">
        {postDetailData.content}
      </p>

      {currentId && (
        <LikeButton
          postId={postDetailData.id}
          likesCounts={likesCounts}
          setLikesCounts={setLikesCounts}
        />
      )}
    </section>
  );
};

export default DetailCard;
