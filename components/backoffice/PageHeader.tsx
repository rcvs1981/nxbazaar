"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  heading: string;
  href?: string;
  linkTitle?: string;
}

export default function PageHeader({
  heading,
  href,
  linkTitle,
}: Props) {
  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">{heading}</h1>

      {href && linkTitle && (
        <Link href={href}>
          <Button>{linkTitle}</Button>
        </Link>
      )}
    </div>
  );
}
