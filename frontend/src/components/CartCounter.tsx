"use client";

import { useCart } from "@/store/use-cart";

export default function CartCounter() {
  const { items } = useCart();

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  if (count === 0) return null;

  return (
    <span className="absolute top-6 md:top-5 right-2 md:right-6 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in duration-300">
      {count}
    </span>
  );
}