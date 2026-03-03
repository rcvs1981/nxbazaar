"use client";

import { Button } from "@/components/ui/button";

type Props = {
  isLoading: boolean;
  buttonTitle: string;
  loadingButtonTitle: string;
};

export default function SubmitButton({
  isLoading,
  buttonTitle,
  loadingButtonTitle,
}: Props) {
  return (
    <Button type="submit" disabled={isLoading} className="mt-4 ">
      {isLoading ? loadingButtonTitle : buttonTitle}
    </Button>
  );
}
