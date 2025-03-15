import { useStore } from "@/schema/tinybase-schema";
import { Key } from "react-aria-components";
import { LuShoppingCart, LuX } from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
    selectedKeys: "all" | Iterable<Key> | undefined
    setSelectedKeys: React.Dispatch<React.SetStateAction<"all" | Iterable<Key> | undefined>>;
}


export function ProductsToolBar({ selectedKeys, setSelectedKeys }: Props) {
    const storeReference = useStore();
    const hasSelectedKeys = selectedKeys === 'all' || (selectedKeys && (Array.isArray(selectedKeys) ? selectedKeys.length > 0 : [...selectedKeys].length > 0))
    const selectedKeysLength = selectedKeys === 'all' ? 'all' : (selectedKeys ? (Array.isArray(selectedKeys) ? selectedKeys.length : [...selectedKeys].length) : 0);
    const handleUnselectAll = () => {
        setSelectedKeys(new Set());
    };
    const AddSelectedToCart = () => {
        if (selectedKeys === "all") {
            storeReference?.forEachRow("products", (rowId, forEachCell) => {
                storeReference.setPartialRow(
                    "cart",
                    rowId,
                    {
                        image: storeReference.getCell('products', rowId, "image"),
                        name: storeReference.getCell('products', rowId, "name"),
                        price: storeReference.getCell('products', rowId, "price"),
                        totalPrice: storeReference.getCell('products', rowId, "price"),
                        amount: 1,
                    },
                )
            })
            toast.success('added all to cart')
        }
        else if (selectedKeys) {
            storeReference?.transaction(() => {
                for (const key of selectedKeys as Iterable<Key>) {
                    storeReference.setPartialRow(
                        'cart',
                        `${key}`,
                        {
                            image: storeReference.getCell('products', `${key}`, "image"),
                            name: storeReference.getCell('products', `${key}`, "name"),
                            price: storeReference.getCell('products', `${key}`, "price"),
                            totalPrice: storeReference.getCell('products', `${key}`, "price"),
                            amount: 1,
                        }
                    )
                }
            })
            toast.success('added selected product to cart')
        }
    }
    return (
        <div className="flex flex-wrap items-center gap-2">
            {hasSelectedKeys && (
                <>
                    <Button type='button' size={"icon"} variant={"destructive"} onClick={handleUnselectAll}>
                        <LuX className='size-5' />
                    </Button>
                    <p className='ml-2 text-lg'>{selectedKeys === 'all' ? 'All selected' : `Products ${selectedKeysLength}`}</p>
                    <Button className="ml-auto" type='button' variant={"outline"} onClick={() => AddSelectedToCart()}>
                        <LuShoppingCart className='size-5' />
                        Add selected to cart
                    </Button>
                </>
            )}
        </div>
    )
}