"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { generateInitials } from "@/lib/generateInitials";

// ✅ User Type
type User = {
  name?: string | null;
  image?: string | null;
  role?: "USER" | "ADMIN" | string;
};

// ✅ Props Type
type UserAvatarProps = {
  user?: User;
};

export default function UserAvatar({ user }: UserAvatarProps) {
  const name = user?.name ?? "";
  const image = user?.image ?? "";
  const role = user?.role;

  const initials = generateInitials(name);

  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {image ? (
            <Image
              src={image} // ✅ FIX: dynamic image
              alt={name || "User"}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 shadow-md border border-slate-600">
              {initials}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="py-2 px-4 pr-8">
        {/* 🔹 User Name */}
        <DropdownMenuLabel>{name || "Guest"}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* 🔹 Dashboard */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        {/* 🔹 Profile */}
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>

        {/* 🔹 Orders (only USER) */}
        {role === "USER" && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* 🔹 Logout */}
        <DropdownMenuItem>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}