"use client";

import { useEffect } from "react";
import { saveLocation } from "@/lib/storage";

export const useAutoLocation = () => {
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          const data = await res.json();

          const location = {
            city: data.city,
            state: data.principalSubdivision,
            country: data.countryName,
          };

          saveLocation(location); // ✅ FIXED
        } catch (err) {
          console.log(err);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
};