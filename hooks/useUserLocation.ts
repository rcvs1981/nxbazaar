"use client";

import { useEffect, useState } from "react";

type LocationData = {
  lat: number;
  lng: number;
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return { location, error };
};