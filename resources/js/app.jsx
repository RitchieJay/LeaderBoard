import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../css/app.css";
import { NavigationProvider } from "./contexts/navigation";
import router from "./routes";
import { AuthProvider } from "./contexts/auth";

// Render the app
const root = createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <NavigationProvider>
                <RouterProvider router={router} />
            </NavigationProvider>
        </AuthProvider>
    </React.StrictMode>
);
