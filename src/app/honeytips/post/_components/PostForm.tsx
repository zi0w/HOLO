"use client";

import { updatePost } from "@/app/honeytips/_actions/update";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { addPost, uploadPostImageFile } from "@/app/honeytips/_utils/post";
import CategorySelectModal from "@/app/honeytips/post/_components/SelectModal";
import XButton from "@/assets/images/honeytips/BigX.svg";
import Plus from "@/assets/images/honeytips/plus.svg";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useModalStore } from "@/store/useModalStore";
import clsx from "clsx";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type PostFormProps = {
  postDetailData: Post | null;
};

const PostForm = ({ postDetailData }: PostFormProps) => {
  const [title, setTitle] = useState<string>(postDetailData?.title || "");
  const [content, setContent] = useState<string>(postDetailData?.content || "");
  const [category, setCategory] = useState<string>(
    postDetailData?.categories || "청소",
  );
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(
    postDetailData?.post_image_url || [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isModalOpen, openModal, closeModal, modalType } = useModalStore();

  const mode = !!postDetailData ? "edit" : "create";

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "청소";

  useEffect(() => {
    const categoryFromParams =
      initialCategory === "전체" ? "청소" : initialCategory;
    setCategory(categoryFromParams);
  }, [initialCategory]);

  useEffect(() => {
    if (mode === "edit" && postDetailData) {
      setTitle(postDetailData.title);
      setContent(postDetailData.content);
      setCategory(postDetailData.categories);
    }
  }, [mode, postDetailData]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          if (image) {
            const publicUrl = await uploadPostImageFile(image);
            return publicUrl;
          }
          return null;
        }),
      );

      const finalImageUrls = uploadedImageUrls.filter(Boolean) as string[];

      const imageUrlsToSave = [
        ...imageUrls.filter((url) => !url.includes("blob:")),
        ...finalImageUrls,
      ];

      if (mode === "edit" && postDetailData) {
        await updatePost({
          postId: postDetailData.id,
          updatedTitle: title,
          updatedContent: content,
          updatedCategory: category,
          updatedPostImageUrl: imageUrlsToSave,
          userId: postDetailData.user_id,
        });
      } else {
        await addPost({
          newTitle: title,
          newContent: content,
          newPostImageUrl: imageUrlsToSave,
          newCategory: category,
        });
        router.push("/honeytips");
      }
    } catch (error) {
      console.error("게시물 저장 중 오류가 발생했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (mode === "edit" && postDetailData) {
      router.push(`/honeytips/${postDetailData.id}`);
    } else {
      setTitle("");
      setContent("");
      setCategory("청소");
      setImages([]);
      router.push("/honeytips");
    }
    closeModal();
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files && e.target.files[0] instanceof File) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);

      const newImageUrls = [...imageUrls];
      newImageUrls[index] = URL.createObjectURL(e.target.files[0]);
      setImageUrls(newImageUrls);
    }
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const isSubmitDisabled = !title.trim() || !content.trim() || isLoading;

  return (
    <div className="mx-5 lg:mx-auto lg:mt-[120px] lg:max-w-[762px]">
      <h2 className="hidden text-2xl text-base-800 lg:block">꿀팁 쓰기</h2>
      <form className="mt-5">
        {isModalOpen && modalType === "form" && (
          <ConfirmModal
            text={"취소"}
            isOpen={isModalOpen}
            onConfirm={handleCancel}
            onCancel={() => closeModal()}
          />
        )}
        <section className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => openModal("form")}
            className="rounded px-3 py-1.5 text-base-800 lg:hidden"
            disabled={isLoading}
          >
            취소
          </button>
          <CategorySelectModal
            selectedCategory={category}
            onChange={setCategory}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className={clsx(
              "hover: rounded px-3 py-1.5 text-base-800 hover:text-primary-500 lg:hidden",
              {
                "cursor-not-allowed opacity-50": isSubmitDisabled,
              },
            )}
            disabled={isSubmitDisabled}
          >
            {isLoading ? "등록 중..." : "등록"}
          </button>
        </section>

        <section className="mb-4 mt-8">
          <label
            htmlFor="title"
            className="hidden lg:block lg:font-bold lg:text-base-800"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="w-full rounded-md border border-primary-200 p-2 lg:mt-3"
            disabled={isLoading}
          />
        </section>

        <section className="mb-2 lg:mb-6 lg:mt-10">
          <label
            htmlFor="content"
            className="hidden lg:block lg:font-bold lg:text-base-800"
          >
            내용
          </label>
          <textarea
            value={content}
            id="content"
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요."
            className="h-[297px] w-full rounded-md border border-primary-200 p-2 lg:mt-3"
            rows={10}
            disabled={isLoading}
          />
        </section>

        <div className="flex justify-between">
          <section className="mx-auto grid flex-1 grid-cols-3 gap-4 lg:ml-0 lg:max-w-[358px]">
            {[0, 1, 2].map((index) => (
              <article key={index} className="relative w-full">
                <label
                  htmlFor={`image-upload-${index}`}
                  className="flex aspect-square cursor-pointer items-center justify-center rounded-md border border-primary-200"
                >
                  {imageUrls[index] ? (
                    <Image
                      src={imageUrls[index]}
                      alt={`Preview ${index}`}
                      width={200}
                      height={200}
                      className="h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-base-500">
                      <Plus />
                    </span>
                  )}
                  <input
                    id={`image-upload-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />
                </label>

                {imageUrls[index] && (
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute right-0 top-0 p-1 text-black"
                  >
                    <XButton />
                  </button>
                )}
              </article>
            ))}
          </section>
          <section className="hidden lg:block">
            <button
              type="button"
              onClick={() => openModal("post")}
              className="mr-2 rounded border px-6 pb-1.5 pt-2 font-gmarket text-base-800"
              disabled={isLoading}
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={clsx(
                "rounded border bg-primary-500 px-6 pb-1.5 pt-2 font-gmarket text-white",
                {
                  "cursor-not-allowed opacity-50": isSubmitDisabled,
                },
              )}
              disabled={isSubmitDisabled}
            >
              {isLoading ? "등록 중..." : "등록"}
            </button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
