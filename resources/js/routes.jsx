import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import AdminIndexPage from "./pages/admin/index";
import AdminLeaderboardsPage from "./pages/admin/leaderboards";
import AdminUsersPage from "./pages/admin/users";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
    /*
     * Public routes
     */
    {
        errorElement: <ErrorPage />,
    },

    /*
     * Admin routes
     */
    {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <AdminIndexPage />,
            },
            {
                path: "leaderboards",
                element: <AdminLeaderboardsPage />,
            },
            {
                path: "users",
                element: <AdminUsersPage />,
            },
        ],
    },
]);

export default router;
