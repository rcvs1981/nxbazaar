import { z } from "zod";

export const bannerSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  link: z
    .string()
    .url("Link must be a valid URL")
    .optional()
    .or(z.literal("")),

  imageUrl: z
    .string()
    .url("Image URL must be valid"),

  isActive: z.boolean(),
});

export type BannerInput = z.infer<typeof bannerSchema>;