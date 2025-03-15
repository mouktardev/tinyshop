import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
    beforeLoad: (p) => {
        if (p.location.pathname === '/') {
            throw redirect({ to: '/products' });
        }
    },
})
