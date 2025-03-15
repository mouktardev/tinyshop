import { Footer } from '@/components/footer'
import { MainSidebar } from '@/components/main-sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { LuTriangleAlert } from 'react-icons/lu'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  notFoundComponent() {
    return (
      <section className="container relative mx-auto flex flex-1 flex-col gap-5 p-3 md:p-5">
        <div className="flex items-center gap-3 rounded-lg border border-destructive bg-background p-5 text-red-500">
          <LuTriangleAlert className="size-6" />
          <p className="leading-none">Page Not found 404</p>
        </div>
        <Link to="/">
          <Button variant={'outline'}>go home</Button>
        </Link>
      </section>
    );
  },
})

function RouteComponent() {
  return (
    <SidebarProvider >
      <MainSidebar />
      <main className="flex min-h-dvh w-full flex-col">
        <header className="sticky top-0 z-50 flex h-[50px] items-center gap-5 border-b border-accent bg-background/30 px-3 backdrop-blur-md">
          <SidebarTrigger />
          <div className='ml-auto'>
            <ThemeToggle />
          </div>
        </header>
        <Outlet />
        <Footer />
      </main>
    </SidebarProvider>
  )
}
