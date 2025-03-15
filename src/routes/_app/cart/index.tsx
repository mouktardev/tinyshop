import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { CellProps, RowView, useCell, useDelRowCallback, useMetric, useRowIds, useSetPartialRowCallback } from '@/schema/tinybase-schema'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { createFileRoute } from '@tanstack/react-router'
import { LuMinus, LuPlus, LuShoppingBag, LuTrash2 } from 'react-icons/lu'

export const Route = createFileRoute('/_app/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  const products = useRowIds('cart')
  const totalPrice = useMetric('total_price') as number
  return (
    <section className="container relative mx-auto flex flex-1 flex-col gap-5 p-3 md:p-5">
      {products.length > 0 ? (
        <>
          {products.map((rowId) => (
            <div key={rowId} className="relative flex items-center gap-3 rounded-lg border p-2 shadow-lg">
              <RowView tableId='cart' rowId={rowId} cellComponent={CustomCell} />
            </div>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button className='mt-auto'>
                Confirm total order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Total price order</DialogTitle>
              <DialogDescription className='space-x-4'>
                <span className='text-lg font-bold'>${totalPrice.toFixed(2)}</span>
              </DialogDescription>
              <Button>
                Confirm
              </Button>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="m-auto flex items-center gap-3 text-muted-foreground">
          <LuShoppingBag className="size-6" />
          <p className='text-lg font-semibold'>Cart is empty</p>
        </div>
      )}
    </section>
  )
}

const CustomCell = (props: typeof CellProps) => {
  const image = useCell("cart", props.rowId, "image") as string;
  const name = useCell("cart", props.rowId, "name") as string;
  const price = useCell("cart", props.rowId, "price") as number;
  const total_price = useCell("cart", props.rowId, "totalPrice") as number;
  const amount = useCell("cart", props.rowId, "amount") as number;
  const removeRow = useDelRowCallback(
    'cart',
    props.rowId,
  );
  const changeAmount = useSetPartialRowCallback(
    'cart',
    props.rowId,
    (value: number) => ({
      amount: value,
      totalPrice: value * price,
    })
  )

  return props.cellId === "image" ? (
    <div className='w-32 overflow-hidden rounded-lg shadow-lg'>
      <img src={image} alt={name} className="rounded-lg object-cover" />
    </div>
  )
    : props.cellId === "name" ? (
      <div className="font-bold">
        <p className="block text-lg">
          {name}
        </p>
        <p className="block">
          ${total_price.toFixed(2)}
        </p>
      </div>
    )
      : props.cellId === "amount" ? (
        <div className="inline-flex items-center justify-center gap-4">
          <Button size={'icon'} variant={'outline'} onClick={() => changeAmount(amount + 1)} className='rounded-full'>
            <LuPlus className='size-6' />
          </Button>
          <p className='font-bold'>{amount}</p>
          <Button size={'icon'} variant={'outline'} onClick={() => amount > 1 && changeAmount(amount - 1)} className='rounded-full'>
            <LuMinus className='size-6' />
          </Button>
        </div>
      )
        : props.cellId === "price" ? (
          <Button className='absolute -top-2 right-0' variant='destructive' onClick={removeRow}>
            <LuTrash2 className="size-4" />
          </Button>
        ) : null
}