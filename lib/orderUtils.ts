export function generateOrderNumber(length: number): string {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let result = ""

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length)
    result += chars[index]
  }

  return result
}

export function calculateGST(
  subTotal: number,
  gstRate: number
): { gstAmount: number; total: number } {

  const gstAmount = (subTotal * gstRate) / 100
  const total = subTotal + gstAmount

  return { gstAmount, total }
}