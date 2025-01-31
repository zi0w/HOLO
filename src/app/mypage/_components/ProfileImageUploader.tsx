import Image from "next/image";

type ProfileImageUploaderProps = {
  previewUrl: string;
  onImageChange: (file: File | null) => void;
};

const ProfileImageUploader = ({
  previewUrl,
  onImageChange,
}: ProfileImageUploaderProps) => {
  const defaultImageUrl =
    "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onImageChange(file || null);
  };

  return (
    <div className="mb-4 flex justify-center">
      <button
        type="button"
        onClick={() => document.getElementById("profile-image-input")?.click()}
        className="relative h-24 w-24 overflow-hidden rounded-full"
      >
        <Image
          src={previewUrl || defaultImageUrl}
          alt="프로필 이미지"
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImageUrl;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-base-800 bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
          <span className="text-sm text-base-50">변경</span>
        </div>
      </button>
      <input
        id="profile-image-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUploader;
