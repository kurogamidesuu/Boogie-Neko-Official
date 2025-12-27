import { Product } from "@/lib/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = Product & {
  quantity: number;
}

export type CartStore = {
  items: CartItem[];
  addItem: (product: Product) => void;
  decreaseItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // Cart Items
      items: [],

      // Add To Cart
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === product.id);

        if (existingItem) {
          set({
            items: items.map((i) => 
              i.id === product.id ? {...i, quantity: i.quantity+1 } : i
            ),
          });
        } else {
          set({
            items: [...items, {
              ...product,
              quantity: 1,
            }],
          });
        }
      },

      // Decrease item in cart
      decreaseItem: (id) => {
        const { items } = get();
        const item = items.find(i => i.id === id);

        if (!item) return;

        if (item.quantity > 1) {
          set({
            items: items.map((i) => 
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          set({
            items: items.filter((i) => i.id !== id)
          });
        }
      },

      // Remove Item in cart
      removeItem: (id) => {
        const {items} = get();
        set({ items: items.filter((i) => i.id !==  id) });
      },

      // clear cart
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'boogie-neko-cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  )
);