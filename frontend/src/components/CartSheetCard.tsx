"use client";

import { CartItem, useCart } from '@/store/use-cart'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { formatCurrency } from '@/lib/helper'

const CartSheetCard = ({
  item,
}: {
  item: CartItem,
}) => {
  const { addItem, decreaseItem } = useCart();

  return (
    <div className='flex gap-2 items-center bg-primary/10 rounded-[7px] font-body py-2 md:py-3 px-1 my-1'>
      <div className='h-15 w-15 md:h-20 md:w-20 relative aspect-square'>
        <Image src={item.images.url || '/default-product-image.png'} fill alt={item.images.altText || 'product image'} />
      </div>
      <div>
        <p className='font-semibold'>{item.title}</p>
        <p className='text-[10px] md:text-xs text-muted-foreground'>{item.description}</p>
      </div>
      <div className='flex flex-col items-center gap-5'>
        {/* Remove the * 100 later */}
        <p className='text-sm font-semibold text-foreground/70'>{formatCurrency(item.price * 100)}</p>
        <div className='flex gap-1 md:gap-2 items-center'>
          <Button variant='outline' className='h-5 w-6 rounded-e-none cursor-pointer text-muted-foreground font-bold' onClick={() => decreaseItem(item.id)}>
            <Minus />
          </Button>
          <span className='text-sm font-semibold'>{item.quantity}</span>
          <Button variant='outline' className='h-5 w-6 rounded-s-none cursor-pointer text-muted-foreground font-bold' onClick={() => addItem(item)}>
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartSheetCard