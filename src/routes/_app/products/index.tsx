import { ProductsPaginator } from '@/components/products-page/procuts-paginator'
import { ProductsFilter } from '@/components/products-page/products-filter'
import { ProductsGrid } from '@/components/products-page/products-grid'
import { ProductsSearch } from '@/components/products-page/products-search'
import { ProductsTable } from '@/components/products-page/products-table'
import { Button } from '@/components/ui/button'
import { ProductsSearchSchema } from '@/schema/forms-schema'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LuFileBox, LuLayoutGrid, LuLayoutList } from 'react-icons/lu'

export const Route = createFileRoute('/_app/products/')({
  component: RouteComponent,
  validateSearch: ProductsSearchSchema,
})

function RouteComponent() {
  const { layout } = Route.useSearch();
  return (
    <section className="container relative mx-auto flex flex-1 flex-col gap-5 p-3 md:p-5">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center space-x-4">
          <LuFileBox className="size-6" />
          <h1 className="text-xl font-semibold">Products page</h1>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          from="/products"
          search={(prev) => ({
            ...prev,
            layout: !layout,
          })}
        >
          <Button variant={'outline'}>
            {layout ? (
              <LuLayoutGrid className="size-5" />
            ) : (
              <LuLayoutList className="size-5" />
            )}
          </Button>
        </Link>
        <ProductsSearch />
        <ProductsFilter />
      </div>
      {layout ? <ProductsGrid /> : <ProductsTable />}
      <ProductsPaginator />
    </section>
  )
}
