import { MyCell, MyColumn, MyRow, MyTable, MyTableBody, MyTableHeader } from "@/components/ui/table-aria";
import { productsRoute } from "@/lib/route-api";
import { ResultCellProps, ResultCellView, ResultRowView, useResultCell, useResultSortedRowIds } from "@/schema/tinybase-schema";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button as ButtonAria, Key } from "react-aria-components";
import { LuArrowDown, LuArrowUp, LuSearchX } from "react-icons/lu";
import { ProductsAction } from "./product-action";
import { ProductsToolBar } from "./products-toolbar";

export function ProductsTable() {
    const { sortby, order, page, pageSize } = productsRoute.useSearch();
    const offset = page * pageSize
    const sortedQueryTableRowIds = useResultSortedRowIds(
        "productsQuery",
        sortby,
        order,
        offset,
        pageSize,
    );
    const [selectedKeys, setSelectedKeys] = useState<"all" | Iterable<Key> | undefined>(new Set());

    return (
        <>
            <ProductsToolBar selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} />
            <div className="customScrollStyle relative rounded-md border">
                <MyTable aria-label="posts" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} selectionMode="multiple">
                    <MyTableHeader>
                        <MyColumn id="id"><ToggleHeader value="id" /></MyColumn>
                        <MyColumn id="name"><ToggleHeader value="name" /></MyColumn>
                        <MyColumn id="price"><ToggleHeader value="price" /></MyColumn>
                        <MyColumn id="tags"><ToggleHeader value="tags" /></MyColumn>
                        <MyColumn id="action" isRowHeader></MyColumn>
                    </MyTableHeader>
                    <MyTableBody className="[&_tr:last-child]:border-0" renderEmptyState={() =>
                        <div className="flex w-full items-center justify-center gap-4 p-4 text-muted-foreground">
                            <LuSearchX className="size-5" />
                            <p>Product not found</p>
                        </div>
                    }>
                        {sortedQueryTableRowIds.map((rowId) => <CustomRow key={rowId} rowId={rowId} />)}
                    </MyTableBody>
                </MyTable>
            </div>
        </>
    );
}

const ToggleHeader = ({ value }: { value: string }) => {
    const { order, sortby } = productsRoute.useSearch();
    const navigate = useNavigate({ from: "/products" });
    const handleSortAndToggleOrder = (sortby: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                sortby,
                order: !order,
            })
        })
    }
    return (
        <ButtonAria type="button" className="flex gap-2 outline-none" onPress={() => handleSortAndToggleOrder(value)}>
            {value}
            {sortby === value && order ? (
                <LuArrowDown className="size-4" />
            ) : (
                <LuArrowUp className="size-4" />
            )
            }
        </ButtonAria>
    )
}

const CustomRow = ({ rowId }: { rowId: string }) => {
    const id = useResultCell("productsQuery", rowId, "id")
    return (
        <MyRow key={`${id}`} id={`${id}`}>
            <ResultRowView
                queryId="productsQuery"
                rowId={rowId}
                resultCellComponent={CustomCell}
                getResultCellComponentProps={() => ({ id })}
            />
            <MyCell>
                <ProductsAction rowId={`${id}`} />
            </MyCell>
        </MyRow>
    )
}

const CustomCell = (props: typeof ResultCellProps & { id?: string }) => {
    const tags = useResultCell(props.queryId, props.rowId, "tags") as string;

    return props.cellId === "id" ? (
        <MyCell>
            <ResultCellView {...props} />
        </MyCell>
    ) : props.cellId === "name" ? (
        <MyCell>
            <ButtonAria className="hover:underline">
                <Link to="/products/$products" params={{ products: props.id as string }} search={(prev) => ({ ...prev })} className="hover:underline">
                    <ResultCellView {...props} />
                </Link>
            </ButtonAria>
        </MyCell>
    )
        :
        props.cellId === "price" ? (
            <MyCell>
                <ResultCellView {...props} /> USD
            </MyCell>
        )
            :
            props.cellId === "tags" ? (
                <MyCell>{tags && (
                    <div className="flex max-w-60 flex-wrap gap-2">
                        {tags.split(",").map((tag, index) => (
                            <div
                                key={index}
                                className="rounded-full bg-accent px-2.5 py-0.5 text-xs text-muted-foreground "
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
                </MyCell>
            )
                : null
}