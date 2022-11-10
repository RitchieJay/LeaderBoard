import { createContext, useCallback, useContext, useState } from "react";
import PropTypes from "prop-types";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated as msalUseIsAuthenticated } from "@azure/msal-react";
import { loginRequest, msalConfig } from "../auth/config";

export const AuthContext = createContext({
    accessToken: null,
    setAccessToken: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const useIsAuthenticated = () => msalUseIsAuthenticated();

export const useLogin = () => {
    const { instance: msalInstance } = useMsal();

    return useCallback(async () => {
        try {
            const response = await msalInstance.loginRedirect(loginRequest);
            return response;
        } catch (e) {
            console.error(e);
        }
    }, [msalInstance]);
};

export const useFetchAccessToken = () => {
    const { instance: msalInstance, accounts } = useMsal();
    const { accessToken, setAccessToken } = useAuthContext();

    return useCallback(async () => {
        if (!accounts || accounts.length < 1 || accessToken) {
            return;
        }

        const request = {
            ...loginRequest,
            account: accounts[0],
        };

        try {
            const response = await msalInstance.acquireTokenSilent(request);
            if (response.accessToken) {
                setAccessToken(response.accessToken);
            }
        } catch (e) {
            const response = await msalInstance.acquireTokenPopup(request);
            if (response.accessToken) {
                setAccessToken(response.accessToken);
            }
        }
    }, [accounts, accessToken, setAccessToken, msalInstance]);
};

export const AuthProvider = ({ children }) => {
    const msalInstance = new PublicClientApplication(msalConfig);
    const [accessToken, setAccessToken] = useState(null);

    console.log(accessToken);

    return (
        <MsalProvider instance={msalInstance}>
            <AuthContext.Provider
                value={{
                    accessToken,
                    setAccessToken,
                }}
            >
                {children}
            </AuthContext.Provider>
        </MsalProvider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
