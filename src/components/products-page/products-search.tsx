import { productsRoute } from "@/lib/route-api";
import { useQueries } from "@/schema/tinybase-schema";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function ProductsSearch() {
    const queriesReference = useQueries()
    const { search, tags } = productsRoute.useSearch();
    const navigate = useNavigate({ from: "/products" });
    const handleSearch = useDebouncedCallback((searchTerm: string) => {
        navigate({
            search: (prev) => ({
                ...prev,
                search: searchTerm,
            }),
        })
    }, 300);

    useEffect(() => {
        queriesReference?.setQueryDefinition(
            "productsQuery", //queryId
            "products", //tableId
            ({ select, having }) => {
                select((_, rowId) => parseInt(rowId)).as("id");
                select("image");
                select("name");
                select("price");
                select("tags");
                //search condition 
                having((getCell) =>
                    (getCell("name") as string).includes(search)
                );
                having((getCell) => {
                    const QueryTags = (getCell("tags") as string).split(",");
                    const queryTagSet = new Set(QueryTags);
                    const selectedTags = tags.split(",");
                    return tags === "" ? true : selectedTags.every((tag) => queryTagSet.has(tag));
                });
            }
        );
        return () => {
            queriesReference?.destroy()
        }
    },
        [queriesReference, search, tags]
    )

    return (
        <div className="flex items-center gap-2">
            <Label htmlFor="search-posts" className="sr-only">Search</Label>
            <div className="relative">
                <Input id="search-posts" className="peer pe-9 ps-9" placeholder="search by title" type="search"
                    defaultValue={search}
                    onChange={(e) => {
                        handleSearch(e.target.value)
                    }}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                    <LuSearch size={16} strokeWidth={2} />
                </div>
            </div>
        </div>
    )
}