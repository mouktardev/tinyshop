import { CellView, useCell, useSetPartialRowCallback } from "@/schema/tinybase-schema";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button as ButtonAria, Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { LuArrowRight, LuEllipsisVertical, LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";

type Props = {
    rowId: string;
};

export function ProductsAction({ rowId }: Props) {
    const [openCart, setOpenCart] = useState<boolean>(false)
    const image = useCell("products", rowId, "image") as string;
    const name = useCell("products", rowId, "name") as string;
    const price = useCell("products", rowId, "price") as number;
    const [amount, setAmount] = useState(1)

    const addToCart = useSetPartialRowCallback(
        'cart',
        rowId,
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
        <>
            <MenuTrigger>
                <ButtonAria
                    aria-label="Menu"
                    className="inline-flex items-center justify-center  px-2 py-1 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:text-primary/50 disabled:opacity-50"
                >
                    <LuEllipsisVertical className="size-4" />
                </ButtonAria>
                <Popover placement='bottom right' className="origin-top-left overflow-auto rounded-lg border bg-popover p-1 shadow-lg fill-mode-forwards entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95">
                    <Menu className="outline-none">
                        <MenuItem className="box-border w-full cursor-pointer rounded-md p-2 text-sm text-popover-foreground outline-none focus:bg-secondary">
                            <Link to="/products/$products" params={{ products: rowId }} search={(prev) => ({ ...prev })} className='flex items-center gap-2'>
                                <LuArrowRight className="size-4" />
                                Open
                            </Link>
                        </MenuItem>
                        <MenuItem className="box-border flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm text-popover-foreground outline-none focus:bg-secondary" onAction={() => setOpenCart(true)}>
                            <LuShoppingCart className='size-4' />
                            add to cart
                        </MenuItem>
                    </Menu>
                </Popover>
            </MenuTrigger>
            <Dialog open={openCart} onOpenChange={setOpenCart}>
                <DialogContent aria-describedby={undefined}>
                    <DialogTitle>
                        <CellView tableId="products" rowId={`${rowId}`} cellId="name" />
                    </DialogTitle>
                    <div className='w-full overflow-hidden rounded-lg shadow-lg'>
                        <img src={image} alt={name} className="m-auto rounded-lg object-cover" />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col justify-center">
                            <p className='text-muted-foreground'>Total price:</p>
                            <p className='font-bold'>${(price * amount).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button size={'icon'} variant={'outline'} onClick={() => setAmount(amount + 1)} className='rounded-full'>
                                <LuPlus className='size-6' />
                            </Button>
                            <p className='font-bold'>{amount}</p>
                            <Button size={'icon'} variant={'outline'} onClick={() => amount > 1 && setAmount(amount - 1)} className='rounded-full'>
                                <LuMinus className='size-6' />
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"default"} onClick={addToCart}>Add to cart</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}