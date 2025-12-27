"use client";

import { useCart } from "@/store/use-cart";
import { Button } from "./ui/button";
import { Product } from "@/lib/api";
import { toast } from "sonner";

export default function AddToCartButton({
  product,
}: {
  product: Product
}) {
  const { addItem } = useCart();

  const addToCart = (product: Product) => {
    addItem(product);
    toast.success('Added to cart successfully!');
  }

  return (
    <Button
      className='bg-slate-700 hover:bg-slate-950 cursor-pointer'
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </Button>
  )
}