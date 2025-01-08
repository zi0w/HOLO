"use client";

import { addPost, uploadPostImageFile } from "@/app/honeytips/_utils/post";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostInput = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("청소");
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
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
    setTitle("");
    setContent("");
    setCategory("청소");
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

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold">카테고리</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border p-2"
        >
          <option value="청소">청소</option>
          <option value="요리">요리</option>
          <option value="문화">문화</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold">제목</label>
        <input
          type="text"
          value={title}
          placeholder="제목을 입력해주세요."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border p-2"
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold">내용</label>
        <textarea
          value={content}
          placeholder="내용을 입력해주세요."
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border p-2"
          rows={10}
          disabled={isLoading}
        />
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
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
          onClick={handleCancel}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          disabled={isLoading}
        >
          취소
        </button>
      </div>

      <div className="mt-6 flex justify-start space-x-4">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostInput;
