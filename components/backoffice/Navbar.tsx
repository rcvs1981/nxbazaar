"use client";

import {
  AlignJustify,
  Bell,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import UserAvatar from "./UserAvatar";

/* ✅ Props Type */
type NavbarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
};

export default function Navbar({
  setShowSidebar,
  showSidebar,
}: NavbarProps) {
  const { data: session, status } = useSession();

  /* ✅ Loading State */
  if (status === "loading") {
    return (
      <div className="h-20 flex items-center px-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
 <div className="flex items-center justify-between
bg-orange-100 dark:bg-slate-900
h-16 py-4
border-b border-orange-200 dark:border-orange-700
fixed top-0 w-full px-6 z-30 lg:pl-64">
      {/* Logo (Mobile) */}
      <Link href="/dashboard" className="sm:hidden font-bold text-lg">
        nbr
      </Link>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setShowSidebar((prev) => !prev)}
        className="text-lime-700 dark:text-lime-500"
      >
        <AlignJustify />
      </button>

      {/* Right Side */}
      <div className="flex items-center space-x-3">

        {/* Theme */}
        <ThemeSwitcherBtn />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative inline-flex items-center p-2 rounded-lg"
            >
              <Bell className="text-lime-700 dark:text-lime-500" />

              {/* Badge */}
              <span className="absolute top-0 right-0 w-5 h-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
                20
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="py-2 px-4 w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {[1, 2, 3].map((item) => (
              <React.Fragment key={item}>
                <DropdownMenuItem>
                  <div className="flex items-start space-x-2 w-full">
                    <Image
                      src="/profile.JPG"
                      alt="User profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />

                    <div className="flex flex-col text-sm">
                      <p>Yellow Sweet Corn Stock out</p>

                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 bg-red-600 text-white rounded-full text-xs">
                          Stock Out
                        </span>
                        <span className="text-xs text-gray-500">
                          Dec 12 2021
                        </span>
                      </div>
                    </div>

                    <button className="ml-auto">
                      <X size={16} />
                    </button>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        {status === "authenticated" && session?.user && (
          <UserAvatar user={session.user} />
        )}
      </div>
    </div>
  );
}