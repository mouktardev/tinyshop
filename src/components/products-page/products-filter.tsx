import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { productsRoute } from "@/lib/route-api";
import { cn } from "@/lib/utils";
import { useResultTableCellIds, useSliceIds } from "@/schema/tinybase-schema";
import { Link, useNavigate } from "@tanstack/react-router";
import { LuArrowDownUp, LuArrowDownWideNarrow, LuArrowUpNarrowWide, LuCheck, LuSlidersHorizontal } from "react-icons/lu";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
export function ProductsFilter() {
    const queryTableCellIds = useResultTableCellIds("productsQuery")
    const navigate = useNavigate({ from: "/products" });
    const { tags, sortby, order } = productsRoute.useSearch();
    const tagsValue = useSliceIds("by_tags");
    const uniqueTags = Array.from(new Set(tagsValue.flatMap((tag) => tag.split(","))));
    const activeTags = tags === "" ? "" : tags.split(',')

    const toggleTag = (tag: string) => {
        navigate({
            search: (prev) => {
                const currentTags = prev.tags ? prev.tags.split(',') : []
                const tagIndex = currentTags.indexOf(tag)
                if (tagIndex === -1) {
                    currentTags.push(tag) // Add tag if not present
                } else {
                    currentTags.splice(tagIndex, 1) // Remove tag if present
                }
                return { ...prev, tags: currentTags.join(',') }
            },
        })
    };

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className="relative">
                        <LuSlidersHorizontal className="mr-2 size-4" />
                        Filters
                        {activeTags.length > 0 && (
                            <Badge
                                className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-secondary p-0 text-muted-foreground"
                            >
                                {activeTags.length}
                            </Badge>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="customScrollStyle max-h-[200px] max-w-[300px]">
                    <p className="mb-2 font-medium">Tags:</p>
                    <div className="flex flex-wrap items-center gap-2">
                        {uniqueTags.map((tag) =>
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={cn(
                                    'px-2 py-1 text-sm rounded-full transition-colors border',
                                    'hover:bg-muted flex items-center justify-between',
                                    activeTags.includes(tag)
                                        ? 'bg-secondary text-primary font-medium'
                                        : 'text-muted-foreground'
                                )}
                            >
                                {tag}
                            </button>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className="relative">
                        <LuArrowDownUp className="size-6" /> {sortby}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="flex max-w-[200px] flex-col gap-2">
                    {queryTableCellIds.filter((value) => value !== "image").map((value) => (
                        <Link key={value} to="/products" search={(prev) => ({ ...prev, sortby: value })} className="flex cursor-pointer items-center justify-between rounded-md p-2 text-sm text-popover-foreground outline-none hover:bg-secondary">
                            {value}
                            <LuCheck className={cn(sortby === value ? "visible" : "invisible", "size-4")} />
                        </Link>
                    ))}
                </PopoverContent>
            </Popover>
            <Link
                from='/products'
                search={(prev) => ({
                    ...prev,
                    order: !order,
                })}
            >
                <Button variant={'outline'}>
                    {order ? (
                        <LuArrowDownWideNarrow className="size-5" />
                    ) : (
                        <LuArrowUpNarrowWide className="size-5" />
                    )}
                </Button>
            </Link>
        </>
    )
}