import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import AdminEditUserPage from "./pages/admin/edit-user";
import AdminHomePage from "./pages/admin/home";
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
                element: <AdminHomePage />,
            },
            {
                path: "leaderboards",
                element: <AdminLeaderboardsPage />,
            },
            {
                path: "users",
                element: <AdminUsersPage />,
                children: [],
            },
            {
                path: "users/create",
                element: <AdminEditUserPage />,
            },
            {
                path: "users/:displayName/edit",
                element: <AdminEditUserPage />,
            },
        ],
    },
]);

export default router;
