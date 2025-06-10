import { createClient } from "@/lib/utils/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export const uploadProfileImageFile = async (file: File) => {
    const supabase = createClient()
    try {
      const compressedFile = await convertImageFormat(file, "image/webp");
  
      const { data: imageData, error: uploadError } = await supabase.storage
        .from("profile_image")  
        .upload(`${uuidv4()}.webp`, compressedFile);
  
      if (uploadError) throw uploadError;
  
      const { data: publicUrlData } = supabase.storage
        .from("profile_image")  
        .getPublicUrl(imageData.path);
  
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("이미지 스토리지 저장에 실패했습니다.", error);
      throw error;
    }
};
  
export const convertImageFormat = (file: File, format: string): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = () => {
        img.src = reader.result as string;
      };
  
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
  
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: format,
                lastModified: file.lastModified,
              });
              resolve(compressedFile);
            } else {
              reject("Blob conversion failed.");
            }
          },
          format,
          0.7,
        );
      };
    });
};

