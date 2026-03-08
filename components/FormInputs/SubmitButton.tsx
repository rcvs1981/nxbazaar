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
    <Button type="submit" disabled={isLoading} className=" center px-4 py-2 rounded-md text-white 
bg-gradient-to-r from-orange-500 to-orange-600 
dark:from-orange-600 dark:to-orange-700">


      {isLoading ? loadingButtonTitle : buttonTitle}
    </Button>
  );
}
