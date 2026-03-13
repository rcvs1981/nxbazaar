export function calculateGST(
  price: number,
  qty: number,
  gstRate: number
) {
  const subTotal = price * qty

  const gstAmount = (subTotal * gstRate) / 100

  const total = subTotal + gstAmount

  return {
    subTotal,
    gstAmount,
    total,
  }
}