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
import Link from "next/link";
import { generateInitials } from "@/lib/generateInitials";
import { UserType } from "@/lib/validators/userSchema";
import { logoutAction } from "@/actions/logout";

type Props = {
  user?: UserType;
};

export default function UserAvatar({ user }: Props) {
  const name = user?.name ?? "User";
  const image = user?.image;
  const role = user?.role;

  const initials = generateInitials(name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {image ? (
            <Image
              src={image} // ✅ FIX: dynamic image
              alt="User profile"
              width={40}
              height={40}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 shadow-md border border-slate-600 text-sm font-semibold">
              {initials}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="py-2 px-4 pr-8">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/profile"
            className="flex items-center space-x-2"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>

        {role === "USER" && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/orders"
              className="flex items-center space-x-2"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <form action={logoutAction}>
            <button className="flex items-center space-x-2 w-full text-left">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}