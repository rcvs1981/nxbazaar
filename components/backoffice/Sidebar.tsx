"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/limiLogo.webp";

import {
  Boxes,
  Building2,
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
  User,
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
import { signOut } from "next-auth/react";

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export default function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const sidebarLinks = [
    { title: "Customers", icon: Users2, href: "/dashboard/customers" },
    { title: "Markets", icon: Warehouse, href: "/dashboard/markets" },
    { title: "Sellers", icon: UserSquare2, href: "/dashboard/sellers" },
    { title: "Orders", icon: Truck, href: "/dashboard/orders" },
    { title: "Sales", icon: Truck, href: "/dashboard/sales" },
    { title: "Our Staff", icon: User, href: "/dashboard/staff" },
    { title: "Community", icon: Building2, href: "/dashboard/community" },
    { title: "Wallet", icon: CircleDollarSign, href: "/dashboard/wallet" },
    { title: "Farmer Support", icon: HeartHandshake, href: "/dashboard/farmer-support" },
    { title: "Settings", icon: LayoutGrid, href: "/dashboard/settings" },
    { title: "Online Store", icon: ExternalLink, href: "/" },
  ];

  const catalogueLinks = [
    { title: "Products", icon: Boxes, href: "/dashboard/products" },
    { title: "Categories", icon: LayoutList, href: "/dashboard/categories" },
     { title: "SubCategories", icon: LayoutList, href: "/dashboard/subcategories" },
    { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
    { title: "Banners", icon: MonitorPlay, href: "/dashboard/banners" },
  ];

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <div
      className={
        showSidebar
          ? "sm:block mt-20 sm:mt-0 bg-white dark:bg-slate-800 w-64 h-screen fixed left-0 top-0 shadow-md overflow-y-scroll"
          : "hidden sm:block mt-20 sm:mt-0 bg-white dark:bg-slate-800 w-64 h-screen fixed left-0 top-0 shadow-md overflow-y-scroll"
      }
    >
      <Link onClick={() => setShowSidebar(false)} className="px-6 py-4" href="/dashboard">
        <Image src={logo} alt="logo" className="w-36" />
      </Link>

      <div className="space-y-3 flex flex-col">

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className={`flex items-center space-x-3 px-6 py-2 ${
            pathname === "/dashboard" && "border-l-8 border-lime-500 text-lime-500"
          }`}
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>

        {/* Catalogue */}
        <Collapsible className="px-6">
          <CollapsibleTrigger
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center justify-between w-full py-2"
          >
            <div className="flex items-center space-x-3">
              <Slack />
              <span>Catalogue</span>
            </div>
            {openMenu ? <ChevronDown /> : <ChevronRight />}
          </CollapsibleTrigger>

          <CollapsibleContent className="py-3 pl-6 space-y-1">
            {catalogueLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setShowSidebar(false)}
                  className={`flex items-center space-x-3 py-1 text-sm ${
                    pathname === item.href && "text-lime-500"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>

        {/* Sidebar Links */}
        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              key={i}
              href={item.href}
              onClick={() => setShowSidebar(false)}
              className={`flex items-center space-x-3 px-6 py-2 ${
                pathname === item.href && "border-l-8 border-lime-500 text-lime-500"
              }`}
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <div className="px-6 py-4">
          <button
            onClick={handleLogout}
            className="bg-lime-600 w-full rounded-md flex items-center justify-center space-x-3 px-6 py-3 text-white"
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
}
