"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Heading from "./Heading";

interface PageHeaderProps {
  heading: string;
  linkTitle: string;
  href: string;
}

export default function PageHeader({ heading, linkTitle, href }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <Heading title={heading} />
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-base font-medium text-white shadow-sm transition-colors hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
      >
        <Plus className="w-4 h-4" />
        {linkTitle}
      </Link>
    </div>
  );
}
