"use client";

import { useEffect, useState } from "react";

export default function DeliverToButton() {
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("pincode");
    if (saved) setPincode(saved);
  }, []);

  return (
    <button className="border px-4 py-2 rounded-lg">
      Deliver to {pincode || "Select Location"}
    </button>
  );
}