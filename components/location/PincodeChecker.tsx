"use client";

import { useState } from "react";
import { checkDelivery } from "@/lib/pincode";

export default function PincodeChecker() {
  const [pin, setPin] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const res = checkDelivery(pin);
    setResult(res);
  };

  return (
    <div className="space-y-2">
      <input
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter Pincode"
        className="input"
      />

      <button
        onClick={handleCheck}
        className="bg-orange-500 text-white px-3 py-2 rounded-lg"
      >
        Check
      </button>

      {result && (
        <p
          className={
            result.success ? "text-green-600" : "text-red-500"
          }
        >
          {result.message}
          {result.eta && ` (${result.eta})`}
        </p>
      )}
    </div>
  );
}