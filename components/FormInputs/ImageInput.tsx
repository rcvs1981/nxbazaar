"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";

export function ImageUpload() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center justify-center">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setImageUrls(res.map(file => file.url));
          }
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
      />
      
      {imageUrls.length > 0 && (
        <div className="mt-4">
          <h3>Uploaded Images:</h3>
          <div className="flex gap-2">
            {imageUrls.map(url => (
              <img 
                key={url} 
                src={url} 
                alt="Uploaded content" 
                className="h-20 w-20 object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}