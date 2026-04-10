export const getPincodeFromCoords = async (
  lat: number,
  lng: number
) => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENCAGE_KEY;

  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`
  );

  const data = await res.json();

  const components = data.results[0]?.components;

  return {
    city: components?.city || components?.town,
    state: components?.state,
    pincode: components?.postcode,
  };
};