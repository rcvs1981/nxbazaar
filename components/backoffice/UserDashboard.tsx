import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function userDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await axios.get("/api/dashboard");
      return res.data;
    },
  });
}
