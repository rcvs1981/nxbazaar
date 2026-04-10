import Link from "next/link";

/* ================= TYPES ================= */

type Props = {
  subTotal: number;
};

export default function CartSubTotalCard({ subTotal }: Props) {
  const shipping = 10;
  const tax = 0;

  const totalPrice = (
    Number(subTotal || 0) + Number(shipping) + Number(tax)
  ).toFixed(2);

  return (
    <div className="md:col-span-4 col-span-full bg-white border rounded-lg p-5">
      <h2 className="text-2xl pb-3 border-b">Cart Summary</h2>

      <p className="py-6 text-gray-400 text-sm">
        Add your Shipping address at checkout
      </p>

      <div className="flex justify-between py-4 font-bold">
        <span>Total</span>
        <span>₹{totalPrice}</span>
      </div>

      <Link
        href="/checkout"
        className="block text-center text-white py-3 bg-black rounded-lg"
      >
        Continue to Checkout
      </Link>
    </div>
  );
}