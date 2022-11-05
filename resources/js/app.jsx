import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../css/app.css";
import ErrorPage from "./pages/error";
import HomePage, { loader as homeLoader } from "./pages/home";

// Create the router
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
        loader: homeLoader,
    },
]);

// Render the app
const root = createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
