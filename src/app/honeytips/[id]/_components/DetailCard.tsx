"use client";

import DetailLoading from "@/app/honeytips/[id]/_components/DetailLoading";
import LikeButton from "@/app/honeytips/[id]/_components/LikeButton";
import DropdownButton from "@/app/honeytips/_components/DropdownButton";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { deletePost, fetchPostDetail } from "@/app/honeytips/_utils/detail";
import ArrowLeftIcon from "@/assets/images/common/arrow-left-icon.svg";
import MenuDots from "@/assets/images/honeytips/more-horizontal.svg";
import Modal from "@/components/common/Modal";
import useModalStore from "@/store/modalStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const { setIsModalOpen, setIsConfirm, isConfirm } = useModalStore();

  const formatDate = (date: string) => {
    return dayjs(date).format("YYYY년 MM월 DD일 HH:mm:ss");
  };

  useEffect(() => {
    const fetchPostDetailData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const postDetailData = await fetchPostDetail(postId);
        setPostDetailData(postDetailData);
        setLikesCounts(postDetailData!.likes[0].count);
      } catch (error) {
        setIsError(true);
        console.error(
          "디테일 데이터를 불러오는 중 문제가 발생했습니다.",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostDetailData();
  }, [postId]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await getId();
        setCurrentId(userId);
      } catch (error) {
        setIsError(true);
        console.error("유저 ID를 가져오는 중 문제가 발생했습니다.", error);
      }
    };
    dayjs.locale("ko");
    fetchUserId();
  }, []);

  const handleDeletePost = async (postId: Post["id"]) => {
    setIsConfirm(true);
    setIsModalOpen(true);

    if (!isConfirm) return;

    try {
      await deletePost(postId);
      setIsConfirm(false);
    } catch (error) {
      setIsError(true);
      console.error("게시물 삭제에 실패했습니다.", error);
    }
  };

  if (isLoading) return <DetailLoading />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  if (!postDetailData) return null;

  return (
    <section className="mx-5">
      <button
        type="button"
        onClick={() => router.push("/honeytips")}
        className="py-5"
      >
        <ArrowLeftIcon />
      </button>
      <Modal
        text={"삭제"}
        onAction={() => handleDeletePost(postId)}
        onClose={() => router.push("/honeytips")}
      />
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
                <DropdownButton
                  label="수정"
                  href={`/honeytips/post?edit=${postDetailData.id}`}
                />
                <DropdownButton
                  label="삭제"
                  onClick={() => {
                    setIsConfirm(true);
                    setIsModalOpen(true);
                  }}
                />
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
        className="my-4 ml-0 h-auto max-w-[362px]"
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

      <h2 className="text-[22px] text-base-900">{postDetailData.title}</h2>

      <p className="mb-10 mt-2 whitespace-pre-wrap text-base-800">
        {postDetailData.content}
      </p>
      <LikeButton
        postId={postDetailData.id}
        likesCounts={likesCounts}
        setLikesCounts={setLikesCounts}
      />
    </section>
  );
};

export default DetailCard;
