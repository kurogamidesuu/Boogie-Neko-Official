import { addToCart, getCart, Product, removeFromCart } from "@/lib/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuth } from "./use-auth";

export type CartItem = Product & {
  quantity: number;
}

export type CartStore = {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  decreaseItem: (productId: number) => Promise<void>;
  syncWithServer: () => Promise<void>;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      // Cart Items
      items: [],

      // Add To Cart
      addItem: async (product) => {
        const { isAuthenticated } = useAuth.getState();
        const { items } = get();
        const existingItem = items.find(i => i.id === product.id);

        if (existingItem) {
          set({
            items: items.map((i) => 
              i.id === product.id ? {...i, quantity: i.quantity + 1 } : i
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

        if (isAuthenticated) {
          try {
            await addToCart({productId: product.id, quantity: 1});
          } catch(e) {
            console.error('Failed to sync cart', e)
          }
        }
      },

      // Decrease item in cart
      decreaseItem: async (id) => {
        const { isAuthenticated } = useAuth.getState();
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

        if (isAuthenticated) {
          try {
            await removeFromCart({ productId: id, quantity: 1});
          } catch(e) {
            console.error('Faield to sync cart', e);
          }
        }
      },

      syncWithServer: async () => {
        try {
          const localItems = get().items;
          if (localItems.length > 0) {
            for(const item of localItems) {
              await addToCart({ productId: item.id, quantity: 1 });
            }
          }

          const res = await getCart();

          const serverItems = res.items.map((item) => ({
            id: item.productId,
            title: item.product.title,
            description: item.product.description,
            price: item.product.price,
            stock: item.product.stock,
            categoryId: item.product.categoryId,
            images: item.product.images,
            quantity: item.quantity,
          }));

          set({
            items: serverItems,
          });
        } catch(e) {
          console.error('Sync failed', e);
        }
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