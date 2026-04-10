"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/limiLogo.webp";
import { Menu, User, X } from "lucide-react";
import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import HelpModal from "./HelpModal";
import CartCount from "./CartCount";
import { useSession } from "next-auth/react";
import UserAvatar from "../backoffice/UserAvatar";

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className = "" }: NavbarProps) {
  const { data: session, status } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (status === "loading") {
    return (
      <div className="h-16 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-50 h-20 flex flex-col justify-center transition-all duration-300
        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg dark:bg-black/70"
            : "bg-gradient-to-r from-green-300 to-green-600"
        }
        ${className}`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-8 gap-4">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="logo" width={100} height={40} priority />
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex flex-grow">
            <SearchForm />
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-4 md:gap-6">
            {status === "unauthenticated" ? (
              <Link href="/login" className="flex items-center gap-1">
                <User size={20} />
                Login
              </Link>
            ) : (
              <UserAvatar user={session?.user} />
            )}

            <HelpModal />
            <CartCount />
            <ThemeSwitcherBtn />
          </div>

          {/* MOBILE BTN */}
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu />
          </button>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden px-4 pb-2">
          <SearchForm />
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-4 flex justify-between border-b">
            <h2 className="font-bold">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>

            {status === "unauthenticated" ? (
              <Link href="/login">Login</Link>
            ) : (
              <UserAvatar user={session?.user} />
            )}

            <HelpModal />
            <CartCount />
            <ThemeSwitcherBtn />
          </div>
        </div>
      </div>
    </>
  );
}