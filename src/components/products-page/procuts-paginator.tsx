import { productsRoute } from "@/lib/route-api";
import { useResultRowIds } from "@/schema/tinybase-schema";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export function ProductsPaginator() {
    const { page, pageSize } = productsRoute.useSearch();
    const queryTableRowIds = useResultRowIds('productsQuery')
    const totalPages = Math.ceil(queryTableRowIds.length / pageSize)
    const navigate = useNavigate({ from: "/products" });
    const handlePageChange = (page: number) => {
        navigate({
            search: (prev) => ({
                ...prev,
                page,
            }),
        })
    }
    return (
        <div className="flex items-center gap-3">
            <Button
                type="button"
                variant={"outline"}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 0}
            >
                Previous
            </Button>
            <Button
                type="button"
                variant={"outline"}
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages - 1}
            >
                Next
            </Button>
            <p>
                Page {page + 1} of {totalPages}
            </p>
        </div>
    )
}