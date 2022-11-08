import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import ErrorPage from "./pages/error";
import AdminHomePage from "./pages/admin/home";

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
                element: <AdminHomePage />,
                index: true,
            },
        ],
    },
]);

export default router;
