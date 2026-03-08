import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { CreateUserInput } from "@/lib/validators/user";

export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      const res = await api.post("/users", data);
      return res.data;
    },
  });
}