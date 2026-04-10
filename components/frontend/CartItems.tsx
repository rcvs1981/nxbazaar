import CartProduct from "./CartProduct";
import EmptyCart from "./EmptyCart";

/* ================= TYPES ================= */

type CartItem = {
  id: string;
  title: string;
  salePrice: number; // ✅ FIX
  imageUrl?: string; // ✅ FIX
  qty: number;
};

type Props = {
  cartItems: CartItem[];
};

export default function CartItems({ cartItems }: Props) {
  return (
    <div className="md:col-span-8 col-span-full">
      {cartItems.length > 0 && (
        <>
          <h2 className="py-2 mb-6 text-2xl">Shopping Cart</h2>

          <div className="flex justify-between border-b pb-3 text-sm mb-4 text-gray-400">
            <h2>PRODUCT</h2>
            <h2>QUANTITY</h2>
            <h2>PRICE</h2>
          </div>
        </>
      )}

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartProduct key={item.id} cartItem={item} />
        ))
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}