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
import { motion } from "framer-motion";

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

type NavbarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
};

export default function Navbar({ setShowSidebar }: NavbarProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-16 flex items-center px-6 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="
      fixed top-0 left-0 right-0 z-40
      px-1 py-0
    ">
      {/* 🔥 Gradient Border */}
      <div className="
        p-[1px] rounded-2xl
        bg-gradient-to-r from-purple-600/30 to-pink-900/30
      ">
        {/* 🧊 Glass Navbar */}
        <div className="
          flex items-center justify-between
          rounded-2xl px-10 py-1
          backdrop-blur-xl
          bg-white/5
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            {/* Sidebar Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSidebar((prev) => !prev)}
              className="
                p-2 rounded-xl
                hover:bg-white/10
                transition-all duration-300
              "
            >
              <AlignJustify className="text-white/80" />
            </motion.button>

            {/* Logo */}
            <Link href="/dashboard" className="font-bold text-lg">
              <span className="
                bg-gradient-to-r from-purple-500 to-indigo-600
                bg-clip-text text-transparent
              ">
                
              </span>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            {/* Theme */}
            <ThemeSwitcherBtn />

            {/* 🔔 Notification */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="
                    relative p-3 rounded-xl
                    hover:bg-white/10 transition
                  "
                >
                  <Bell className="text-white/80" />

                  {/* 🔥 Animated Badge */}
                  <span className="
                    absolute -top-1 -right-1
                    w-5 h-5 text-xs
                    flex items-center justify-center
                    bg-red-500 text-white rounded-full
                    animate-pulse
                  ">
                    3
                  </span>
                </motion.button>
              </DropdownMenuTrigger>

              {/* 🧊 Glass Dropdown */}
              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="
                  w-[320px] p-2
                  rounded-xl
                  backdrop-blur-xl
                  bg-white/10
                  border border-white/20
                  shadow-2xl text-white
                "
              >
                <DropdownMenuLabel className="text-white/70">
                  Notifications
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-white/20" />

                {[1, 2, 3].map((item) => (
                  <React.Fragment key={item}>
                    <DropdownMenuItem className="
                      hover:bg-white/10
                      rounded-lg p-2 transition
                    ">
                      <div className="flex items-start gap-2 w-full">

                        <Image
                          src="/profile.JPG"
                          alt="User"
                          width={36}
                          height={36}
                          className="rounded-full"
                        />

                        <div className="flex flex-col text-sm">
                          <p className="text-white">
                            New order received
                          </p>
                          <span className="text-xs text-white/60 mt-1">
                            2 min ago
                          </span>
                        </div>

                        <button className="ml-auto hover:text-red-400">
                          <X size={16} />
                        </button>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/10" />
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 👤 User */}
            {status === "authenticated" && session?.user && (
              <UserAvatar user={session.user} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}