export const saveLocation = (loc: any) => {
  localStorage.setItem("user_location", JSON.stringify(loc));
};

export const getLocation = () => {
  const data = localStorage.getItem("user_location");
  return data ? JSON.parse(data) : null;
};