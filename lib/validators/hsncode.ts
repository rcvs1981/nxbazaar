// schemas/hsn.ts

import { z } from "zod";

export const hsnSchema = z.object({
  code: z.string().min(2),
  title: z.string().min(2),
 gstRate: z.number().min(0).max(100),
hsnCodeId: z.string().optional(),
});