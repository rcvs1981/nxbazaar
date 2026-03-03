"use client"

import React from "react"
import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import DeleteBtn from "../Actions/DeleteBtn"
import EditBtn from "../Actions/EditBtn"

interface ActionColumnProps<T extends { id: string }> {
  row: Row<T>
  title: string
  endpoint: string
  editEndpoint: string
}

export default function ActionColumn<
  T extends { id: string }
>({
  row,
  title,
  endpoint,
  editEndpoint
}: ActionColumnProps<T>) {

  const id = row.original.id

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <span className="sr-only">
            Open menu
          </span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Actions
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <DeleteBtn
            id={id}
            title={title}
            endpoint={endpoint}
          />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <EditBtn
            title={title}
            editEndpoint={editEndpoint}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}