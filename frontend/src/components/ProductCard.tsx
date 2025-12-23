import { Card } from './ui/card'
import Image from 'next/image'
import { Button } from './ui/button';
import { formatCurrency } from '@/lib/helper';

interface ProductCardProps {
  image: string;
  altText: string;
  title: string;
  description: string;
  price: number;
}

export default function ProductCard({
  image,
  altText,
  title,
  description,
  price,
} : ProductCardProps) {
  return (
    <Card className='rounded-sm pt-0 overflow-hidden bg-blue-100'>
      <div className='relative aspect-square'>
        <Image src={image} fill alt={altText} />
      </div>
     <div className='flex flex-col justify-between h-full gap-5'>
       <div className='px-3'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          <p className='text-lg font-bold text-slate-800'>{formatCurrency(price)}</p>
        </div>
        <p className='text-sm text-zinc-600'>{description}</p>
        </div>
        <div className='px-3'>
          <Button className='bg-slate-800 hover:bg-slate-950 cursor-pointer'>Add to Cart</Button>
        </div>
     </div>
    </Card>
  )
}