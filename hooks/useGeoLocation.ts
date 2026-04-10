"use client";

import { useEffect, useState } from "react";

export const useGeoLocation = () => {
  const [coords, setCoords] = useState<any>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return coords;
};