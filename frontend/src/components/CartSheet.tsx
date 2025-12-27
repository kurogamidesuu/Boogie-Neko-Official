"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import dynamic from "next/dynamic";
import { useCart } from "@/store/use-cart";
import CartSheetCard from "./CartSheetCard";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { formatCurrency } from "@/lib/helper";

const CartCounter = dynamic(() => import("@/components/CartCounter"), {
  ssr: false
})

export default function CartSheet() {
  const { items } = useCart();

  const calculateSubtotal = () => {
    const total = items.reduce((acc, item) => acc + ((item.price * 100) * item.quantity), 0);

    return formatCurrency(total / 100);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <ShoppingCartIcon className={`w-5 h-5 md:w-6 md:h-6`} />
          <CartCounter />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle asChild>
            <h1 className="text-2xl font-semibold">My Cart</h1>
          </SheetTitle>
          <SheetDescription>
            Your cart at a glance
          </SheetDescription>
        </SheetHeader>
          {items.length > 0 ? (
            <ScrollArea className="h-[70%] w-[95%] mx-auto mb-5 md:px-3">
              {items.map((item, index) => (
                <CartSheetCard
                  key={index}
                  item={item}
                />
              ))}
            </ ScrollArea>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-muted-foreground/80">
              <p>Your cart is empty...</p>
            </div>
          )}
        
        <SheetFooter>
          <div className="font-body">
            <div className="flex justify-between px-3 mb-5">
              <span className="font-bold">Sub Total:</span>
              <span className='font-semibold'>{calculateSubtotal()}</span>
            </div>
            <SheetClose asChild>
              <Link href='/cart'>
                <Button className="w-full cursor-pointer">Go to Cart</Button>
              </Link>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}