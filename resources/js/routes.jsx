import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import ErrorPage from "./pages/error";
import AdminHomePage from "./pages/admin/home";
import AdminLeaderboardsPage from "./pages/admin/leaderboards";
import AdminUsersPage from "./pages/admin/users";

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
                element: <AdminHomePage />,
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
