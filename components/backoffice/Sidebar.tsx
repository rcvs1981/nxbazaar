"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/limiLogo.webp";

import {
  Boxes,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  HeartHandshake,
  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  ScanSearch,
  Slack,
  Truck,
  UserSquare2,
  Users2,
  Warehouse,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

/* ---------------- TYPES ---------------- */

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
};

type Role = "ADMIN" | "SELLER" | "USER";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

/* ---------------- COMPONENT ---------------- */

export default function Sidebar({
  showSidebar,
  setShowSidebar,
}: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  const role = session?.user?.role as Role | undefined;
  const userStatus = session?.user?.status ?? false;

  /* ---------------- LINKS ---------------- */

  let sidebarLinks: NavItem[] = [
    { title: "Customers", icon: Users2, href: "/dashboard/customers" },
    { title: "Markets", icon: Warehouse, href: "/dashboard/markets" },
    { title: "Sellers", icon: UserSquare2, href: "/dashboard/sellers" },
    { title: "Orders", icon: Truck, href: "/dashboard/orders" },
    { title: "Sales", icon: Truck, href: "/dashboard/sales" },
    { title: "Wallet", icon: CircleDollarSign, href: "/dashboard/wallet" },
    {
      title: "Sellers Support",
      icon: HeartHandshake,
      href: "/dashboard/seller-support",
    },
    { title: "Settings", icon: LayoutGrid, href: "/dashboard/settings" },
    { title: "Online Store", icon: ExternalLink, href: "/" },
  ];

  let catalogueLinks: NavItem[] = [
    { title: "Products", icon: Boxes, href: "/dashboard/products" },
    { title: "Categories", icon: LayoutList, href: "/dashboard/categories" },
     { title: "Sub-Categories", icon: LayoutList, href: "/dashboard/subcategories" },
    { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
    { title: "Store Banners", icon: MonitorPlay, href: "/dashboard/banners" },
  ];

  /* ---------------- ROLE BASED ---------------- */

  if (role === "SELLER") {
    sidebarLinks = [
      { title: "Sales", icon: Truck, href: "/dashboard/sales" },
      { title: "Wallet", icon: CircleDollarSign, href: "/dashboard/wallet" },
      {
        title: "Seller Support",
        icon: HeartHandshake,
        href: "/dashboard/seller-support",
      },
      { title: "Settings", icon: LayoutGrid, href: "/dashboard/settings" },
      { title: "Online Store", icon: ExternalLink, href: "/" },
    ];

    catalogueLinks = [
      { title: "Products", icon: Boxes, href: "/dashboard/products" },
      { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
    ];
  }

  if (role === "USER") {
    sidebarLinks = [
      { title: "My Orders", icon: Truck, href: "/dashboard/orders" },
      { title: "Profile", icon: Truck, href: "/dashboard/profile" },
      { title: "Online Store", icon: ExternalLink, href: "/" },
    ];

    catalogueLinks = [];
  }

  if (role === "SELLER" && !userStatus) {
    sidebarLinks = [];
    catalogueLinks = [];
  }

  /* ---------------- LOGOUT ---------------- */

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/");
  }

  /* ---------------- UI ---------------- */

  return (
  <div
  className={`${
    showSidebar ? "block" : "hidden"
  } sm:block fixed left-0 top-0 z-40 w-64 h-screen 
  mt-16 sm:mt-0
  overflow-y-auto
  bg-orange-200 dark:bg-orange-500
  border-r border-orange-200 dark:border-orange-400
  shadow-sm
  transition-all duration-300
  scrollbar-thin scrollbar-thumb-orange-300 dark:scrollbar-thumb-orange-700`}
>
      {/* LOGO */}
      <Link
        onClick={() => setShowSidebar(false)}
        href="/dashboard"
        className="px-6 py-4"
      >
        <Image src={logo} alt="logo" className="w-36" />
      </Link>

      {/* DASHBOARD */}
      <Link
        href="/dashboard"
        onClick={() => setShowSidebar(false)}
        className={`flex items-center space-x-3 px-6 py-2 ${
          pathname === "/dashboard"
            ? "border-l-8 border-lime-500 text-lime-500"
            : ""
        }`}
      >
        <LayoutGrid />
        <span>Dashboard</span>
      </Link>

      {/* CATALOGUE */}
      {catalogueLinks.length > 0 && (
        <Collapsible className="px-6">
          <CollapsibleTrigger onClick={() => setOpenMenu(!openMenu)}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Slack />
                <span>Catalogue</span>
              </div>
              {openMenu ? <ChevronDown /> : <ChevronRight />}
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="pl-6 py-2">
            {catalogueLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setShowSidebar(false)}
                  className={`flex items-center space-x-2 py-1 text-sm ${
                    pathname === item.href ? "text-lime-500" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* LINKS */}
      {sidebarLinks.map((item, i) => {
        const Icon = item.icon;
        return (
          <Link
            key={i}
            href={item.href}
            onClick={() => setShowSidebar(false)}
            className={`flex items-center space-x-3 px-6 py-2 ${
              pathname === item.href
                ? "border-l-8 border-lime-500 text-lime-500"
                : ""
            }`}
          >
            <Icon />
            <span>{item.title}</span>
          </Link>
        );
      })}

      {/* LOGOUT */}
      <div className="px-6 py-4">
        <button
          onClick={handleLogout}
          className="bg-lime-600 text-white w-full py-2 rounded-md flex items-center justify-center space-x-2"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}