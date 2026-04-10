import Link from "next/link";

export default function EmptyCart(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <p className="text-lg">
        Your Cart is empty{" "}
        <Link href="/" className="text-lime-600">
          Start Shopping
        </Link>
      </p>
    </div>
  );
}