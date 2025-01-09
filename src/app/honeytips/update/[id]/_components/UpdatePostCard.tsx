"use client";

import { updatePost } from "@/app/honeytips/_actions/update";
import { Post } from "@/app/honeytips/_types/honeytips.type";
import { uploadPostImageFile } from "@/app/honeytips/_utils/post";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UpdatePostCardProps = {
  data: Post;
};

const UpdatePostCard = ({ data }: UpdatePostCardProps) => {
  const [title, setTitle] = useState<string>(data.title);
  const [content, setContent] = useState<string>(data.content);
  const [category, setCategory] = useState<string>(data.categories);

  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(
    data.post_image_url || [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (data.post_image_url && data.post_image_url.length > 0) {
      setImageUrls(data.post_image_url);
    }
  }, [data]);

  const handleSubmit = async () => {
    setIsLoading(true);

    // 제목과 내용이 비어있는지 확인
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      setIsLoading(false);
      return;
    }

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

      await updatePost({
        postId: data.id,
        updatedTitle: title,
        updatedContent: content,
        updatedCategory: category,
        updatedPostImageUrl: imageUrlsToSave,
        userId: data.user_id,
      });
    } catch (error) {
      console.error("게시물 수정 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
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

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/honeytips/${data.id}`);
  };

  return (
    <form className="mx-auto max-w-4xl p-4">
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
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border p-2"
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-lg font-semibold">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md border p-2"
          rows={10}
          disabled={isLoading}
        />
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          className={clsx("rounded px-4 py-2 text-white hover:bg-blue-600", {
            "bg-blue-500": !isLoading,
            "cursor-not-allowed opacity-50": isLoading,
          })}
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
              {imageUrls[index] ? (
                <Image
                  src={imageUrls[index]}
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
            {imageUrls[index] && (
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
    </form>
  );
};

export default UpdatePostCard;
