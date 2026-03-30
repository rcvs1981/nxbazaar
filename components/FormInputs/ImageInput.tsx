"use client";

import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

type Props = {
  label: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

export default function ImageInput({
  label,
  imageUrl,
  setImageUrl,
}: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>

      <UploadButton<OurFileRouter>
        endpoint="bannerImageUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            setImageUrl(res[0].ufsUrl); // ✅ FIXED
          }
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />

      {imageUrl && (
        <div className="relative w-40 h-40 border rounded-md">
          <Image
            src={imageUrl}
            alt="preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}