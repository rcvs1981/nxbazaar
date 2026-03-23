"use client";

import { Modal } from "flowbite-react";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { ShareSocial } from "react-share-social";

type ProductShareButtonProps = {
  urlToShare: string;
};

export default function ProductShareButton({
  urlToShare,
}: ProductShareButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setOpenModal(true)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="Share Product"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {/* Modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />

        <Modal.Body>
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">
              Share this product
            </h3>

            <ShareSocial
              url={urlToShare}
              socialTypes={[
                "whatsapp",
                "facebook",
                "twitter",
                "linkedin",
                "email",
              ]}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}