"use client";

import React from "react";
import SearchForm from "./SearchForm";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/limiLogo.webp";

import { User } from "lucide-react";

import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import HelpModal from "./HelpModal";
import CartCount from "./CartCount";
import UserAvatar from "../backoffice/UserAvatar";

import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-white dark:bg-slate-700 border-b">
      <div className="flex items-center justify-between py-3 max-w-6xl mx-auto px-8 gap-6">

        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="limifood logo"
            className="w-24"
            priority
          />
        </Link>

        {/* Search */}
        <div className="flex-grow">
          <SearchForm />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Loading */}
          {status === "loading" && (
            <div className="text-sm text-gray-500">Loading...</div>
          )}

          {/* Not Logged In */}
          {status === "unauthenticated" && (
            <Link
              href="/login"
              className="flex items-center gap-1 text-green-950 dark:text-slate-100"
            >
              <User size={20} />
              <span>Login</span>
            </Link>
          )}

          {/* Logged In */}
          {status === "authenticated" && session?.user && (
            <UserAvatar user={session.user} />
          )}

          <HelpModal />

          <CartCount />

          <ThemeSwitcherBtn />

        </div>
      </div>
    </div>
  );
}