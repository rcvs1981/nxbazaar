
"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.role !== "admin") {
      redirect("/unauthorized");
    }
  }, [session, status]);

  if (status === "loading") {
    return <div>लोडिंग...</div>;
  }

  return <>{children}</>;
}