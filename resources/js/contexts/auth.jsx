import { createContext, useCallback, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useAccount, useMsal, useIsAuthenticated as useMsalIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../auth-config";

export const AuthContext = createContext({
    accessToken: null,
    setAccessToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const useIsAuthenticated = () => {
    const msalIsAuthenticated = useMsalIsAuthenticated();
    const { accessToken } = useAuth();

    return msalIsAuthenticated && !!accessToken;
};

export const useLogin = () => {
    const { instance: msalInstance } = useMsal();

    return useCallback(async () => {
        try {
            // Try logging in via redirect
            return await msalInstance.loginRedirect(loginRequest);
        } catch (e) {
            console.error(e);
        }
    }, [msalInstance]);
};

export const useAcquireAccessToken = () => {
    const { instance: msalInstance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const { setAccessToken } = useAuth();

    return useCallback(async () => {
        // Ensure we have an account
        if (account) {
            // Build the token request
            const request = {
                ...loginRequest,
                account,
            };

            try {
                // Request the token silently
                const authResult = await msalInstance.acquireTokenSilent(request);
                setAccessToken(authResult.accessToken);
                return authResult.accessToken;
            } catch (e) {
                console.error(e);
            }
        }

        setAccessToken(null);
        return null;
    }, [msalInstance, account, setAccessToken]);
};

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
