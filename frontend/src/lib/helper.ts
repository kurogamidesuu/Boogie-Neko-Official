import { CartItem } from "@/store/use-cart";

export function formatCurrency(cur: number) {
  cur = cur / 100;
  return new Intl.NumberFormat("en-IN", { style: 'currency', currency: 'INR' }).format(cur)
}

export function calculateSubtotal(items: CartItem[]) {
  const total = items.reduce((acc, item) => acc + ((item.price * 100) * item.quantity), 0);

  return total;
}