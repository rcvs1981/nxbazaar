"use client";

import { UploadButton } from "@/lib/uploadthing";

interface ImageInputProps {
  label: string;
  endpoint:
    | "categoryImageUploader"
    | "bannerImageUploader"
    | "marketLogoUploader"
    | "multipleProductsUploader"
    | "subcategoryImageUploader"
    | "productImageUploader"
    | "sellerProfileUploader";
  setImageUrl: (url: string) => void;
}

export default function ImageInput({
  label,
  endpoint,
  setImageUrl,
}: ImageInputProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

    <UploadButton
  endpoint="marketLogoUploader"
  onClientUploadComplete={(res) => {
    console.log(res)

    const url = res?.[0]?.url

    setImageUrl(url)
  }}
/>
    </div>
  );
}