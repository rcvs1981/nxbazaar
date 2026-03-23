import {db} from "@/lib/db";

export async function getUser(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      id: true,
    },
  });
}