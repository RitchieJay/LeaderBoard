import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import BaseLayout from "./layouts/base";
import AdminIndexPage from "./pages/admin/index";
import AdminLeaderboardsPage from "./pages/admin/leaderboards";
import AdminUsersPage from "./pages/admin/users";
import ErrorPage from "./pages/error";
import LeaderboardPage from "./pages/leaderboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            /*
             * Public routes
             */
            {
                path: "/l/:urlName",
                element: <LeaderboardPage />,
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
        ],
    },
]);

export default router;
