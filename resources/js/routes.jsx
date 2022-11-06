import { createBrowserRouter } from "react-router-dom";
import SidebarLayout from "./layouts/sidebar-layout";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";

const router = createBrowserRouter([
    {
        element: <SidebarLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
]);

export default router;
