"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/userService";
import axios from "axios";
import { UserType } from "@/schemas/user";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
}



export function useUser() {
  return useQuery<UserType>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data;
    },
  });
}