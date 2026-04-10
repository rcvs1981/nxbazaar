"use client";

import { useEffect, useState } from "react";

type LocationType = {
  city?: string;
  state?: string;
  country?: string;
};

export function useLocation() {
  const [location, setLocation] = useState<LocationType | null>(null);

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

          setLocation({
            city: data.city,
            state: data.principalSubdivision,
            country: data.countryName,
          });
        } catch (err) {
          console.log(err);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return location;
}