"use client"

import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

interface Props {
  selectedIds: string[]
  endpoint: string
  queryKey: readonly unknown[]
}

export default function BulkDeleteButton({
  selectedIds,
  endpoint,
  queryKey,
}: Props) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/${endpoint}/bulk-delete`, {
        ids: selectedIds,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  if (!selectedIds.length) return null

  return (
    <Button
      variant="destructive"
      onClick={() => mutation.mutate()}
    >
      Delete Selected
    </Button>
  )
}