import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { tablesSchema, valuesSchema } from '@/schema/tinybase-schema';
import {
    createRootRouteWithContext,
    Link,
    Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { LuTriangleAlert } from 'react-icons/lu';
import { Inspector } from 'tinybase/ui-react-inspector';
import { Store } from 'tinybase/with-schemas';

interface MyRouterContext {
    store: Store<[typeof tablesSchema, typeof valuesSchema]> | undefined;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootLayout,
    notFoundComponent() {
        return (
            <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-3 p-5">
                <div className="flex items-center gap-3 rounded-lg border border-destructive bg-background p-5 text-red-500">
                    <LuTriangleAlert className="size-6" />
                    <p className="leading-none">Page Not found 404</p>
                </div>
                <Link to="/">
                    <Button variant={'outline'}>go home</Button>
                </Link>
            </div>
        );
    },
});

function RootLayout() {
    return (
        <>
            <Outlet />
            <Inspector />
            <TanStackRouterDevtools />
            <Toaster position="bottom-right" richColors closeButton />
        </>
    );
}
