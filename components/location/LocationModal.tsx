"use client";

import { useEffect, useState } from "react";
import { saveLocation, getLocation } from "@/lib/storage";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LocationModal({ open, onClose }: Props) {
  const [location, setLocation] = useState<any>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = getLocation();
    if (saved) setLocation(saved);
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      const data = await res.json();

      const loc = {
        city: data.city,
        state: data.principalSubdivision,
      };

      setLocation(loc);
      saveLocation(loc);
    });
  };

  const handleManual = () => {
    const loc = { city: input, state: "India" };
    setLocation(loc);
    saveLocation(loc);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-xl p-6 space-y-4">
        
        <h2 className="text-lg font-semibold">Select Location</h2>

        {/* AUTO */}
        <button
          onClick={detectLocation}
          className="w-full bg-orange-500 text-white py-2 rounded-lg"
        >
          📍 Detect My Location
        </button>

        {/* MANUAL */}
        <div className="space-y-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city or pincode"
            className="input"
          />

          <button
            onClick={handleManual}
            className="w-full border py-2 rounded-lg"
          >
            Save Location
          </button>
        </div>

        {/* CURRENT */}
        {location && (
          <div className="border p-3 rounded-lg">
            <p className="font-semibold">Selected:</p>
            <p>
              {location.city}, {location.state}
            </p>
          </div>
        )}

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="w-full text-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}