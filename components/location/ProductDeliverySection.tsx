"use client";

import DeliverToButton from "./DeliverToButton";
import PincodeChecker from "./PincodeChecker";
import { useAutoLocation } from "@/hooks/useAutoLocation";

export default function ProductDeliverySection() {
  useAutoLocation();

  return (
    <div className="space-y-4">
      <DeliverToButton openModal={() => alert("open modal")} />
      <PincodeChecker />
    </div>
  );
}