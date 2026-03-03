"use client";

type Props = {
  label: string;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  endpoint: string;
};

export default function MultipleImageInput({
  label,
  imageUrls,
  setImageUrls,
}: Props) {
  function removeImage(index: number) {
    const updated = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updated);
  }

  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{label}</label>

      <div className="flex gap-3 flex-wrap">
        {imageUrls.map((img, i) => (
          <div key={i} className="relative">
            <img
              src={img}
              className="w-24 h-24 object-cover rounded-md"
              alt="product"
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* UploadThing already integrated in project */}
    </div>
  );
}
