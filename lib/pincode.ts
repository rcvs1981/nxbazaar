export function checkDelivery(pincode: string) {
  // 👉 simple logic (demo)
  const availablePincodes = [
    "440001",
    "440002",
    "440003",
    "440010",
  ];

  if (!pincode) {
    return {
      success: false,
      message: "Enter pincode",
    };
  }

  if (pincode.length !== 6) {
    return {
      success: false,
      message: "Invalid pincode",
    };
  }

  if (availablePincodes.includes(pincode)) {
    return {
      success: true,
      message: "Delivery available 🚚",
      eta: "2-3 days",
    };
  }

  return {
    success: false,
    message: "Delivery not available ❌",
  };
}