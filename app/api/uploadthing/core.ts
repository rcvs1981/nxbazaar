import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many uploaders as you need
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 }
  })
    .middleware(() => {
      // Add any auth logic here
      return { userId: "user123" };
    })
    .onUploadComplete(({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File url:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;