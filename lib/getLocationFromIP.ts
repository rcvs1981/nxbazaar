export const getLocationFromIP = async () => {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();

  return {
    city: data.city,
    state: data.region,
    pincode: data.postal,
  };
};