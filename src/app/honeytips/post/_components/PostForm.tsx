"use client";

import { updatePost } from "@/app/honeytips/_actions/update";
import type { Post } from "@/app/honeytips/_types/honeytips.type";
import { addPost, uploadPostImageFile } from "@/app/honeytips/_utils/post";
import CategorySelectModal from "@/app/honeytips/post/_components/SelectModal";
import Plus from "@/assets/images/honeytips/plus.svg";
import XButton from "@/assets/images/honeytips/x.svg";
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
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

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
          updatedTitle: trimmedTitle,
          updatedContent: trimmedContent,
          updatedCategory: category,
          updatedPostImageUrl: imageUrlsToSave,
          userId: postDetailData.user_id,
        });
      } else {
        await addPost({
          newTitle: trimmedTitle,
          newContent: trimmedContent,
          newPostImageUrl: imageUrlsToSave,
          newCategory: category,
        });
        router.push("/honeytips");
      }

      handleCancel();
    } catch (error) {
      console.error("게시물 저장 중 오류가 발생했습니다.");
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
    <form className="mx-5 py-2">
      <section className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded px-3 py-1.5 text-base-800"
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
            "hover: rounded px-3 py-1.5 text-base-800 hover:text-primary-500",
            {
              "cursor-not-allowed opacity-50": isSubmitDisabled,
            },
          )}
          disabled={isSubmitDisabled}
        >
          {isLoading ? "등록 중..." : "등록"}
        </button>
      </section>

      <section className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요."
          className="w-full rounded-md border border-primary-200 p-2"
          disabled={isLoading}
        />
      </section>

      <section className="mb-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요."
          className="h-[297px] w-full rounded-md border border-primary-200 p-2"
          rows={10}
          disabled={isLoading}
        />
      </section>

      <section className="mx-auto grid grid-cols-3 gap-4">
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
    </form>
  );
};

export default PostForm;
