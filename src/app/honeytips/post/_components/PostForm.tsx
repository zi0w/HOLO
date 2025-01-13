"use client";

import { addPost, uploadPostImageFile } from "@/app/honeytips/_utils/post";
import clsx from "clsx";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PostForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "청소";

  useEffect(() => {
    if (categoryRef.current) {
      categoryRef.current.value = initialCategory;
    }
  }, [initialCategory]);

  const handleSubmit = async () => {
    const title = titleRef.current?.value.trim() || "";
    const content = contentRef.current?.value.trim() || "";

    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const category = categoryRef.current?.value || "청소";

      // 모든 이미지 업로드 후 URL 배열 생성
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          if (image) {
            const publicUrl = await uploadPostImageFile(image);
            return publicUrl;
          }
          return null;
        }),
      );

      // 게시물 저장
      await addPost({
        newTitle: title,
        newContent: content,
        newPostImageUrl: imageUrls.filter(Boolean) as string[],
        newCategory: category,
      });

      // 성공 후 입력값 초기화
      handleCancel();
    } catch (error) {
      console.error("게시물 저장 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
      router.push("/honeytips");
    }
  };

  // 취소 시 입력값 초기화
  const handleCancel = () => {
    if (titleRef.current) titleRef.current.value = "";
    if (contentRef.current) contentRef.current.value = "";
    if (categoryRef.current) categoryRef.current.value = "청소";
    setImages([]);
    router.push("/honeytips");
  };

  // 이미지 파일 업로드
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);
    }
  };

  // 이미지 삭제
  const handleImageDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const categories = ["청소", "요리", "문화", "기타"];

  return (
    <form className="mx-auto max-w-4xl p-4">
      <section className="mb-4">
        <label className="mb-2 block text-lg font-semibold">카테고리</label>
        <select
          ref={categoryRef}
          defaultValue="청소"
          className="w-full rounded-md border p-2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </section>

      <section className="mb-4">
        <label className="mb-2 block text-lg font-semibold" htmlFor="title">
          제목
        </label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          placeholder="제목을 입력해주세요."
          className="w-full rounded-md border p-2"
          disabled={isLoading}
        />
      </section>

      <section className="mb-4">
        <label
          className="mb-2 block p-2 text-lg font-semibold"
          htmlFor="content"
        >
          내용
        </label>
        <textarea
          ref={contentRef}
          id="content"
          placeholder="내용을 입력해주세요."
          className="w-full rounded-md border p-2"
          rows={10}
          disabled={isLoading}
        />
      </section>

      <section className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleSubmit}
          className={clsx(
            "rounded px-4 py-2 text-white hover:bg-blue-600",
            "bg-blue-500",
            { "cursor-not-allowed opacity-50": isLoading },
          )}
          disabled={isLoading}
        >
          {isLoading ? "저장 중..." : "저장"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          disabled={isLoading}
        >
          취소
        </button>
      </section>

      <section className="mt-6 flex justify-start space-x-4">
        {[0, 1, 2].map((index) => (
          <article key={index} className="relative">
            <label
              htmlFor={`image-upload-${index}`}
              className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border bg-gray-200"
            >
              {images[index] ? (
                <Image
                  src={URL.createObjectURL(images[index])}
                  alt={`Preview ${index}`}
                  width={200}
                  height={200}
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <span>+</span>
              )}
              <input
                id={`image-upload-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="hidden"
              />
            </label>
            {images[index] && (
              <button
                type="button"
                onClick={() => handleImageDelete(index)}
                className="absolute right-0 top-0 bg-gray-100 px-1.5 text-black"
              >
                &times;
              </button>
            )}
          </article>
        ))}
      </section>
    </form>
  );
};

export default PostForm;
