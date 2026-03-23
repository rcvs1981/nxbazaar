import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  const session = await auth();

  // Not logged in
  if (!session) {
    redirect("/login");
  }

  // Role protection
  if (session.user.role !== "USER") {
    redirect("/");
  }

  return (
    <div>
      <h2>Welcome {session.user.name}</h2>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
}