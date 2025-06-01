"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>लोडिंग...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">डैशबोर्ड</h1>
      
      <p className="mb-4">नमस्ते, {session.user?.name}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {session.user?.role === "vendor" && (
          <>
            <Link href="/dashboard/products" className="border p-4 rounded-lg hover:bg-gray-50">
              <h2 className="text-xl font-semibold">मेरे उत्पाद</h2>
              <p>अपने उत्पादों को प्रबंधित करें</p>
            </Link>
            
            <Link href="/dashboard/orders" className="border p-4 rounded-lg hover:bg-gray-50">
              <h2 className="text-xl font-semibold">आर्डर्स</h2>
              <p>ग्राहकों के आर्डर्स देखें</p>
            </Link>
          </>
        )}
        
        {session.user?.role === "customer" && (
          <Link href="/dashboard/orders" className="border p-4 rounded-lg hover:bg-gray-50">
            <h2 className="text-xl font-semibold">मेरे आर्डर्स</h2>
            <p>अपने आर्डर्स की स्थिति देखें</p>
          </Link>
        )}
        
        <Link href="/dashboard/profile" className="border p-4 rounded-lg hover:bg-gray-50">
          <h2 className="text-xl font-semibold">प्रोफाइल</h2>
          <p>अपनी प्रोफाइल प्रबंधित करें</p>
        </Link>
      </div>
    </div>
  );
}