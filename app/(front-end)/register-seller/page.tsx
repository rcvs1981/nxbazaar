"use client";

import { useSearchParams } from "next/navigation";
import RegisterForm from "@/components/frontend/RegisterForm";

export default function RegisterPage() {
  const params = useSearchParams();
  const plan = params.get("plan");

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        
        <div className="w-full bg-white rounded-lg shadow-2xl sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700">
          
          <div className="p-6 space-y-6 sm:p-8">
            
            <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create a new account
            </h1>

            <RegisterForm role="SELLER" plan={plan ?? undefined} />

          </div>

        </div>

      </div>
    </section>
  );
}