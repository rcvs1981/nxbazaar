"use client";

import React from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import DeleteBtn from "../Actions/DeleteBtn";
import EditBtn from "../Actions/EditBtn";

interface ActionColumnProps<T extends { id: string }> {
  row: Row<T>;
  title: string;
  endpoint: string;
  editEndpoint: string;
}

export default function ActionColumn<T extends { id: string }>({
  row,
  title,
  endpoint,
  editEndpoint,
}: ActionColumnProps<T>) {
  const id = row.original.id;

  return (
    <div className="relative">
      <DropdownMenu>
        {/* 🔥 Trigger */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-white/10 rounded-md transition"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        {/* 🔥 Content (PRO VERSION) */}
        <DropdownMenuContent
          align="end"
          sideOffset={6}
          className="
            z-50 min-w-[160px]
            bg-gray-800/90 backdrop-blur-md
            text-white
            border-2 border-white/50
            shadow-xl rounded-xl
            animate-in fade-in zoom-in-95
          "
        >
          <DropdownMenuLabel className="text-white/80">
            Actions
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-white/20" />

          {/* 🔴 Delete */}
          <DropdownMenuItem
            className="flex items-center gap-2 hover:bg-red-500/20 rounded-md transition"
          >
            <Trash className="h-4 w-4" />
            <DeleteBtn
              id={id}
              title={title}
              endpoint={endpoint}
            />
          </DropdownMenuItem>

          {/* ✏️ Edit */}
          <DropdownMenuItem
            className="flex items-center gap-2 hover:bg-white/10 rounded-md transition"
          >
            <Pencil className="h-4 w-4" />
            <EditBtn
              title={title}
              editEndpoint={editEndpoint}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}