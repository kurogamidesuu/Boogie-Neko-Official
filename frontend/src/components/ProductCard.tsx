import { Card } from './ui/card'
import Image from 'next/image'
import { formatCurrency } from '@/lib/helper';
import AddToCartButton from './AddToCartButton';
import { Product } from '@/lib/api';

export default function ProductCard({
  product,
} : {
  product: Product
}) {
  return (
    <Card className='rounded-sm pt-0 overflow-hidden bg-blue-100'>
      <div className='relative aspect-square'>
        <Image src={product.images.url || '/default-product-image.png'} fill alt={product.images.altText || 'product image'} />
      </div>
     <div className='flex flex-col justify-between h-full gap-5'>
       <div className='px-3'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-xl font-semibold'>{product.title}</h2>
          <p className='text-lg font-bold text-slate-800'>{formatCurrency(product.price)}</p>
        </div>
        <p className='text-sm text-zinc-600'>{product.description}</p>
        </div>
        <div className='px-3'>
          <AddToCartButton product={product} />
        </div>
     </div>
    </Card>
  )
}