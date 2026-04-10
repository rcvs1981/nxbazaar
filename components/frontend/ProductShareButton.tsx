"use client";

import {
  Share2,
  Copy,
  Check,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import Image from "next/image";

type ProductShareButtonProps = {
  urlToShare: string;
  title: string;
  image?: string;
};

export default function ProductShareButton({
  urlToShare,
  title,
  image,
}: ProductShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + urlToShare)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(urlToShare)}`,
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(urlToShare);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: urlToShare });
    } else {
      toast.error("Not supported");
    }
  };

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Share2 className="w-5 h-5 text-orange-500" />
        </button>
      </DialogTrigger>

      {/* Modal */}
      <DialogContent className="space-y-5 max-w-md">
        <h3 className="text-lg font-semibold text-center">
          Share this product
        </h3>

        {/* 🔥 Product Preview */}
        <div className="flex items-center gap-3 p-3 border rounded-lg">
          {image && (
            <Image
              src={image}
              alt={title}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
          )}
          <p className="text-sm font-medium line-clamp-2">
            {title}
          </p>
        </div>

        {/* 🔥 Social Buttons */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <a href={shareLinks.whatsapp} target="_blank">
            <div className="p-3 rounded-lg hover:bg-gray-100">
              🟢
              <p className="text-xs">WhatsApp</p>
            </div>
          </a>

          <a href={shareLinks.facebook} target="_blank">
            <div className="p-3 rounded-lg hover:bg-gray-100">
              🔵
              <p className="text-xs">Facebook</p>
            </div>
          </a>

          <a href={shareLinks.twitter} target="_blank">
            <div className="p-3 rounded-lg hover:bg-gray-100">
              🐦
              <p className="text-xs">Twitter</p>
            </div>
          </a>
        </div>

        {/* 🔥 Actions */}
        <div className="space-y-2">
          {/* Copy */}
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-orange-500 text-white"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Link"}
          </button>

          {/* Native Share */}
          <button
            onClick={handleNativeShare}
            className="w-full p-2 rounded-lg border hover:bg-gray-100"
          >
            📱 Share via Apps
          </button>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-2 pt-3">
            <QrCode />
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                urlToShare
              )}`}
              alt="QR Code"
              className="border rounded"
            />
            <p className="text-xs text-gray-500">
              Scan to open product
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}