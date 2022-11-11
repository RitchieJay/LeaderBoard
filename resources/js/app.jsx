import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth-config";
import { PageProvider } from "./contexts/page";
import { AxiosProvider } from "./contexts/axios";
import router from "./routes";
import "../css/app.css";

// Create the MSAL instance for auth
const msalInstance = new PublicClientApplication(msalConfig);

// Create the HTTP query client
const queryClient = new QueryClient();

// Render the app
const root = createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <AxiosProvider>
                <QueryClientProvider client={queryClient}>
                    <PageProvider>
                        <RouterProvider router={router} />
                    </PageProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </AxiosProvider>
        </MsalProvider>
    </React.StrictMode>
);
