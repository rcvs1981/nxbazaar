import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const res = await axios.get("/api/sales");
      return res.data;
    },
  });
}