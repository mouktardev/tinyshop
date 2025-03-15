import { productsRoute } from "@/lib/route-api";
import { ResultCellProps, ResultRowView, useQueries, useResultCell, useResultSortedRowIds } from "@/schema/tinybase-schema";
import { Link } from "@tanstack/react-router";
import { LuSearchX } from "react-icons/lu";
import { Badge } from "../ui/badge";

export function ProductsGrid() {
    const { sortby, order, page, pageSize } = productsRoute.useSearch();
    const queriesReference = useQueries();
    const offset = page * pageSize
    const sortedQueryTableRowIds = useResultSortedRowIds(
        "productsQuery",
        sortby,
        order,
        offset,
        pageSize,
    );
    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-10">
            {sortedQueryTableRowIds.length === 0 ?
                <div className="col-span-full flex h-72 w-full items-center justify-center gap-4 p-4 text-muted-foreground">
                    <LuSearchX className="size-5" />
                    <p>Product not found</p>
                </div>
                :
                sortedQueryTableRowIds.map((rowId) => {
                    const id = queriesReference?.getResultCell("productsQuery", rowId, "id") as string
                    return (
                        <Link to='/products/$products' params={{ products: id }} search={(prev) => ({ ...prev })} key={rowId} className="flex flex-col gap-3 rounded-lg border p-2 shadow-lg">
                            <ResultRowView
                                queryId="productsQuery"
                                rowId={rowId}
                                resultCellComponent={CustomCell}
                            />
                        </Link>
                    )
                }
                )}
        </div>
    )
}

const CustomCell = (props: typeof ResultCellProps) => {
    const image = useResultCell(props.queryId, props.rowId, "image") as string;
    const name = useResultCell(props.queryId, props.rowId, "name") as string;
    const price = useResultCell(props.queryId, props.rowId, "price") as number;
    const tags = useResultCell(props.queryId, props.rowId, "tags") as string;


    return props.cellId === "image" ? (
        <div className="overflow-hidden rounded-lg border">
            <img src={image} alt={name} loading="lazy" className="w-full rounded-lg object-cover" />
        </div>
    )
        : props.cellId === "name" ? (
            <p className="block text-lg font-bold">
                {name}
            </p>
        )
            :
            props.cellId === "price" ? (
                <Badge className="block bg-blue-500 text-base font-semibold text-white">
                    {price} USD
                </Badge>
            )
                :
                props.cellId === "tags" ? (
                    <div className="mt-auto flex flex-wrap gap-2">
                        {tags.split(",").map((tag, index) => (
                            <div
                                key={index}
                                className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground "
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                )
                    : null
}