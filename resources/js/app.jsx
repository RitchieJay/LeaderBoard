import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "../css/app.css";
import { msalConfig } from "./auth-config";
import { AuthProvider } from "./contexts/auth";
import { AxiosProvider } from "./contexts/axios";
import { PageProvider } from "./contexts/page";
import router from "./routes";

// Create the MSAL instance for auth
const msalInstance = new PublicClientApplication(msalConfig);

// Create the HTTP query client
const queryClient = new QueryClient();

// Render the app
const root = createRoot(document.getElementById("app"));
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <AuthProvider>
                <AxiosProvider>
                    <QueryClientProvider client={queryClient}>
                        <PageProvider>
                            <RouterProvider router={router} />
                        </PageProvider>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </AxiosProvider>
            </AuthProvider>
        </MsalProvider>
    </React.StrictMode>
);
