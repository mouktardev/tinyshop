import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCell, useSetPartialRowCallback } from '@/schema/tinybase-schema';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useState } from 'react';
import { LuChevronLeft, LuMinus, LuPlus } from 'react-icons/lu';
import { toast } from 'sonner';

export const Route = createFileRoute('/_app/products/$products')({
  component: RouteComponent,
  beforeLoad: ({ context: { store }, params: { products } }) => {
    if (!store?.hasRow('products', products))
      throw notFound()
  },
})

function RouteComponent() {
  const { products } = Route.useParams();
  const name = useCell('products', products, 'name') as string;
  const image = useCell('products', products, 'image') as string;
  const description = useCell('products', products, 'description') as string;
  const price = useCell('products', products, 'price') as number;
  const tags = useCell('products', products, 'tags') as string;
  const [amount, setAmount] = useState(1)

  const addToCart = useSetPartialRowCallback(
    'cart',
    products,
    () => ({
      image,
      name,
      price,
      totalPrice: price * amount,
      amount,
    }),
    [amount],
    undefined,
    (_, partialRow) => {
      toast.success(`added ${partialRow.amount} of ${partialRow.name} to cart`)
    }
  )

  return (
    <section className="container relative mx-auto flex flex-1 flex-col gap-5 p-3 md:p-5">
      <Link to='/products' search={(prev) => ({ ...prev })}>
        <Button variant={'default'}>
          <LuChevronLeft className='size-8' />
        </Button>
      </Link>
      <div className="grid flex-1 gap-3 md:grid-cols-[1fr_1fr] ">
        <div className="flex w-full items-center overflow-hidden border">
          <img src={image} alt={name} className='m-auto object-contain' />
        </div>
        <div className="flex flex-col gap-2 border p-2">
          <h1 className='text-3xl font-bold'>{name}</h1>
          <div className="flex flex-wrap gap-2">
            {tags.split(",").map((tag, index) => (
              <Badge variant={'secondary'} key={index} className='rounded-full'>
                {tag}
              </Badge>
            ))}
          </div>
          <p className="font-medium">
            {description}
          </p>
          <div className="flex items-center gap-10">
            <Badge className='bg-blue-500 text-lg font-bold text-white'>${(price).toFixed(2)}</Badge>
            <div className="ml-auto flex items-center gap-4 md:ml-0">
              <Button size={'icon'} variant={'outline'} onClick={() => setAmount(amount + 1)} className='rounded-full'>
                <LuPlus className='size-6' />
              </Button>
              <p className='font-bold'>{amount}</p>
              <Button size={'icon'} variant={'outline'} onClick={() => amount > 1 && setAmount(amount - 1)} className='rounded-full'>
                <LuMinus className='size-6' />
              </Button>
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <div>
              <p className='text-muted-foreground'>Total price:</p>
              <p className='font-bold'>${(price * amount).toFixed(2)}</p>
            </div>
            <Button className='flex-1' variant={"default"} onClick={addToCart}>Add to cart</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
