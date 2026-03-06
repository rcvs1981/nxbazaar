import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {

  // CATEGORY IMAGE (single image)
  categoryImageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.ufsUrl,   // ⭐ IMPORTANT (v7)
    };
  }),
  subcategoryImageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.ufsUrl,   // ⭐ IMPORTANT (v7)
    };
  }),

  // PRODUCT GALLERY (multiple images)
  productGallery: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.ufsUrl,
    };
  }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
