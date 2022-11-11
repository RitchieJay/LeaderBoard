import { useIsAuthenticated as msalUseIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../auth-config";

export const login = async (msalInstance) => {
    // Try logging in via redirect
    try {
        return await msalInstance.loginRedirect(loginRequest);
    } catch (e) {
        console.error(e);
    }
};

export const getAuthAccessToken = async (msalInstance, accounts) => {
    // Ensure we have an active account
    if (accounts && accounts.length > 0) {
        // Build the request
        const request = {
            ...loginRequest,
            account: accounts[0],
        };

        // Try silently acquiring an access token
        try {
            const response = await msalInstance.acquireTokenSilent(request);
            if (response.accessToken) {
                return response.accessToken;
            }
        } catch (e) {
            // Silently fall through
            console.error(e);
        }

        // Try acquiring an access token via redirect
        try {
            const response = await msalInstance.acquireTokenRedirect(request);
            if (response.accessToken) {
                return response.accessToken;
            }
        } catch (e) {
            // Silently fall through
            console.error(e);
        }
    }

    return null;
};

export const useIsAuthenticated = () => msalUseIsAuthenticated();
