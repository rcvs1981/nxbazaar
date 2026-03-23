"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { HelpCircle } from "lucide-react";

export default function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1">
        <HelpCircle size={20} />
        Help
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Need Help?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-500">
          Contact our support team if you need assistance.
        </p>
      </DialogContent>
    </Dialog>
  );
}