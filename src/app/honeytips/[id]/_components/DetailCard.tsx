"use client";

import DetailLoading from "@/app/honeytips/[id]/_components/DetailLoading";
import LikeButton from "@/app/honeytips/[id]/_components/LikeButton";
import ShareButton from "@/app/honeytips/[id]/_components/ShareButton";
import { useDropdown } from "@/app/honeytips/[id]/_hooks/useDropdown";
import DropdownButton from "@/app/honeytips/_components/DropdownButton";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { getId } from "@/app/honeytips/_utils/auth";
import { deletePost, fetchPostDetail } from "@/app/honeytips/_utils/detail";
import ArrowLeftIcon from "@/assets/images/common/arrow-left-icon.svg";
import MenuDots from "@/assets/images/honeytips/more-horizontal.svg";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useModalStore } from "@/store/useModalStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type DetailCardProps = {
  postId: Post["id"];
};

const DetailCard = ({ postId }: DetailCardProps) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [postDetailData, setPostDetailData] = useState<Post | null>(null);
  const [likesCounts, setLikesCounts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { isDropdownOpen, toggleDropdown, closeDropdown } = useDropdown();
  const { isModalOpen, openModal, closeModal, modalType } = useModalStore();

  const router = useRouter();

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

  const handleDeleteClick = () => {
    openModal("detail");
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(postDetailData!.id);
      router.push("/honeytips");
    } catch (error) {
      setIsError(true);
      console.error("게시물 삭제에 실패했습니다.", error);
    } finally {
      closeModal();
    }
  };

  const handleCancelDelete = () => {
    closeModal();
    closeDropdown();
  };

  if (isLoading) return <DetailLoading />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  if (!postDetailData) return null;

  return (
    <section className="mx-5 lg:mx-auto lg:max-w-[762px]">
      <h2 className="mb-5 hidden text-2xl text-base-800 lg:mt-5 lg:block">
        꿀팁 게시판
      </h2>
      <button
        id="back-button"
        type="button"
        aria-label="뒤로 가기"
        onClick={() => router.push("/honeytips")}
        className="py-5 lg:hidden"
      >
        <ArrowLeftIcon />
      </button>

      {isModalOpen && modalType === "detail" && (
        <ConfirmModal
          text={"삭제"}
          isOpen={isModalOpen}
          onConfirm={handleDeletePost}
          onCancel={handleCancelDelete}
        />
      )}

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
            <button
              id="menu-button"
              type="button"
              aria-label="게시글 수정/삭제"
              onClick={() => toggleDropdown(postDetailData.id)}
            >
              <MenuDots />
            </button>
            {isDropdownOpen(postDetailData.id) && (
              <div className="absolute right-0 top-6 z-10 w-[68px] rounded-lg border bg-white py-2">
                <DropdownButton
                  label="수정"
                  href={`/honeytips/post?edit=${postDetailData.id}`}
                />
                <DropdownButton label="삭제" onClick={handleDeleteClick} />
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <div>
          <Swiper
            modules={[Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            simulateTouch={true}
            grabCursor={true}
            centeredSlides={true}
            pagination={{ clickable: true }}
            className="mx-auto my-4 flex h-auto max-w-[300px] items-center !pb-8 lg:my-6 lg:max-w-[762px]"
          >
            {postDetailData.post_image_url?.map((imageUrl, index) => (
              <SwiperSlide key={index} className="my-auto">
                <Image
                  src={imageUrl}
                  alt={`게시물 이미지 ${index + 1}`}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="mx-auto h-[300px] w-[300px] rounded object-cover lg:h-[762px] lg:w-[762px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div>
          <h2 className="text-[22px] text-base-900 lg:mt-4">
            {postDetailData.title}
          </h2>
          <p className="my-2 whitespace-pre-wrap text-base-800">
            {postDetailData.content}
          </p>
          <div className="mt-6 flex items-start justify-center gap-3">
            <LikeButton
              postId={postDetailData.id}
              likesCounts={likesCounts}
              setLikesCounts={setLikesCounts}
            />
            <ShareButton url={window.location.href} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailCard;
