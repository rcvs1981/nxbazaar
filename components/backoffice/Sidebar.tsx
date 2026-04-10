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
import { motion } from "framer-motion";

/* ---------------- TYPES ---------------- */

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
};

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
  const [openMenu, setOpenMenu] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { status } = useSession();
  if (status === "loading") return null;

  /* ---------------- LINKS ---------------- */

  const sidebarLinks: NavItem[] = [
    { title: "Customers", icon: Users2, href: "/dashboard/customers" },
    { title: "Markets", icon: Warehouse, href: "/dashboard/markets" },
    { title: "Sellers", icon: UserSquare2, href: "/dashboard/sellers" },
    { title: "Orders", icon: Truck, href: "/dashboard/orders" },
    { title: "Sales", icon: Truck, href: "/dashboard/sales" },
    { title: "Wallet", icon: CircleDollarSign, href: "/dashboard/wallet" },
    { title: "Support", icon: HeartHandshake, href: "/dashboard/seller-support" },
    { title: "Settings", icon: LayoutGrid, href: "/dashboard/settings" },
    { title: "Store", icon: ExternalLink, href: "/" },
  ];

  const catalogueLinks: NavItem[] = [
    { title: "Products", icon: Boxes, href: "/dashboard/products" },
    { title: "Categories", icon: LayoutList, href: "/dashboard/categories" },
    { title: "Sub-Categories", icon: LayoutList, href: "/dashboard/subcategories" },
    { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
    { title: "Banners", icon: MonitorPlay, href: "/dashboard/banners" },
  ];

  /* ---------------- LOGOUT ---------------- */

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/");
  }

  /* ---------------- UI ---------------- */

  return (
    <motion.aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ width: expanded ? 240 : 80 }}
      transition={{ duration: 0.3 }}
      className={`
        ${showSidebar ? "block" : "hidden"} sm:block
        fixed left-1 top-20 z-40
        h-[calc(100vh-2rem)]
        rounded-2xl p-[1px]
        bg-gradient-to-b from-purple-500/30 to-pink-500/20
      `}
    >
      {/* Glass */}
      <div className="
        h-full rounded-2xl
        backdrop-blur-2xl
        bg-white/5 border border-white/10
        shadow-[0_20px_60px_rgba(255,115,0,0.3)]
        flex flex-col overflow-hidden
      ">

        {/* LOGO */}
        <div className="p-4 flex justify-center">
          <Image src={logo} alt="logo" className="w-10" />
        </div>

        {/* DASHBOARD */}
        <NavItemUI
          expanded={expanded}
          href="/dashboard"
          icon={LayoutGrid}
          label="Dashboard"
          active={pathname === "/dashboard"}
        />

        {/* CATALOGUE */}
        <Collapsible open={openMenu} onOpenChange={setOpenMenu}>
          <CollapsibleTrigger className="px-2">
            <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <Slack />
                {expanded && <span>Catalogue</span>}
              </div>
              {expanded && (openMenu ? <ChevronDown /> : <ChevronRight />)}
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="pl-4 space-y-1">
            {catalogueLinks.map((item, i) => (
              <NavItemUI
                key={i}
                expanded={expanded}
                href={item.href}
                icon={item.icon}
                label={item.title}
                active={pathname === item.href}
                small
              />
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* LINKS */}
        <div className="mt-2 space-y-1 flex-1">
          {sidebarLinks.map((item, i) => (
            <NavItemUI
              key={i}
              expanded={expanded}
              href={item.href}
              icon={item.icon}
              label={item.title}
              active={pathname === item.href}
            />
          ))}
        </div>

        {/* LOGOUT */}
        <div className="p-3">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3 p-3 rounded-xl
              hover:bg-red-500/20 transition
            "
          >
            <LogOut />
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

/* ---------------- NAV ITEM ---------------- */

function NavItemUI({
  href,
  icon: Icon,
  label,
  active,
  expanded,
  small,
}: any) {
  return (
    <Link href={href}>
      <div
        title={!expanded ? label : ""}
        className={`
          flex items-center gap-3
          ${small ? "px-3 py-3 text-sm" : "px-4 py-4"}
          rounded-xl transition-all duration-300

          ${active
            ? "bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(255,115,0,0.5)]"
            : "hover:bg-white/5 hover:scale-[1.03]"
          }
        `}
      >
        <Icon className="w-5 h-5" />
        {expanded && <span>{label}</span>}
      </div>
    </Link>
  );
}