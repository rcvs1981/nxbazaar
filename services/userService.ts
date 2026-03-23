import { api } from "@/lib/axios";
import { UserInput } from "@/schemas/userSchema";

export async function getUsers() {
  const res = await api.get("/users");
  return res.data;
}

export async function createUser(data: UserInput) {
  const res = await api.post("/users", data);
  return res.data;
}

export async function updateUser(id: string, data: UserInput) {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
}