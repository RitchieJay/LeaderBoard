import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../css/app.css";
import { NavigationProvider } from "./contexts/navigation";
import router from "./routes";

// Render the app
const root = createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <NavigationProvider>
            <RouterProvider router={router} />
        </NavigationProvider>
    </React.StrictMode>
);
