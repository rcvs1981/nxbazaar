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
import {
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { generateInitials } from "@/lib/generateInitials";

/* ================= TYPES ================= */

type UserType = {
  name?: string | null;
  image?: string | null;
  role?: "USER" | "ADMIN" | string;
};

type UserAvatarProps = {
  user?: UserType;
};

/* ================= COMPONENT ================= */

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
      {/* 🔥 Trigger */}
      <DropdownMenuTrigger asChild>
        <button className="rounded-full hover:scale-105 transition">
          {image ? (
            <Image
              src={image}
              alt={name || "User"}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-white/20"
            />
          ) : (
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-500 dark:bg-slate-800 text-white text-sm shadow-md border border-white/20">
              {initials}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      {/* 🔥 PRO DROPDOWN */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="
          z-50 min-w-[220px]
          bg-gray-900/50 backdrop-blur-md
          text-white
          border-2 border-orange-800/90
          shadow-xl rounded-xl
          animate-in fade-in zoom-in-95
          p-2
        "
      >
        {/* 👤 User Info */}
        <DropdownMenuLabel className="flex items-center gap-2 text-white/90">
          <User className="h-4 w-4" />
          {name || "Guest"}
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Dashboard */}
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:bg-white/10 rounded-md p-2 transition"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        {/* Profile */}
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 hover:bg-white/10 rounded-md p-2 transition"
          >
            <Settings className="h-4 w-4" />
            Edit Profile
          </Link>
        </DropdownMenuItem>

        {/* Orders */}
        {role === "USER" && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-2 hover:bg-white/10 rounded-md p-2 transition"
            >
              <Settings className="h-4 w-4" />
              My Orders
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-200 hover:bg-red-500/20 rounded-md p-2 transition cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}