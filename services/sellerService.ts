import api from "@/lib/axios";
import { SellerInput } from "@/lib/validators/seller.schema";

export async function createSeller(data: SellerInput) {
  const res = await api.post("/sellers", data);
  return res.data;
}