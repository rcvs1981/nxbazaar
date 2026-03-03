"use client";
import { UploadButton } from "@/lib/uploadthingClient";

interface Props {
  label: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  endpoint: "categoryImageUploader" | "productGallery"; // ⭐ ADD THIS
}

export default function ImageInput({
  label,
  imageUrl,
  setImageUrl,
  endpoint,
}: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>

      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          const url = res?.[0]?.ufsUrl;
          if (url) setImageUrl(url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="uploaded"
          className="w-32 h-32 object-cover rounded-md border"
        />
      )}
    </div>
  );
}
