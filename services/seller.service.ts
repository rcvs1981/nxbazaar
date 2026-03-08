import axios from "axios";
import { SellerInput } from "@/lib/validators/seller.schema";

export async function createSeller(data: SellerInput) {

  const response = await axios.post("/api/sellers", data);

  return response.data;

}