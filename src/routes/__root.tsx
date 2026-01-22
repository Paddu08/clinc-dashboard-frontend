import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <>
        <div className="flex  items-center justify-center gap-6">
            <Link to="/" className="[&.active]:font-bold">
                Dashboard
            </Link>{' '}
            <Link to="/createnote" className="[&.active]:font-bold">
                New note
            </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
)

export const Route = createRootRoute({ component: RootLayout })