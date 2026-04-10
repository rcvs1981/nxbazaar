"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb(): JSX.Element {
  const pathname = usePathname();

  const pathArr = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">

        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <Home className="w-3 h-3 mr-2" />
            Home
          </Link>
        </li>

        {pathArr.map((item, i) => {
          const href = "/" + pathArr.slice(0, i + 1).join("/");

          return (
            <li key={i}>
              <div className="flex items-center capitalize">
                <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />

                <Link
                  href={href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {decodeURIComponent(item)}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}