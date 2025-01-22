import Image from "next/image";

type ProfileImageUploaderProps = {
  previewUrl: string;
  onImageChange: (file: File | null) => void;
}

const ProfileImageUploader = ({
  previewUrl,
  onImageChange
}: ProfileImageUploaderProps) => {
  const defaultImageUrl = "https://eqanvaummffjgxyujqru.supabase.co/storage/v1/object/public/profile_image/e6a1c347-c123-40c4-ae51-fdc0ffcb910e-1737345924767.jpg";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onImageChange(file || null);
  };

  return (
    <div className="mb-4 flex justify-center">
      <button
        type="button"
        onClick={() => document.getElementById('profile-image-input')?.click()}
        className="relative w-24 h-24 rounded-full overflow-hidden"
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
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-white text-sm">변경</span>
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


