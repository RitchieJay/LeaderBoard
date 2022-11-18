import {
    useAccount,
    useIsAuthenticated as useMsalIsAuthenticated,
    useMsal,
} from "@azure/msal-react";
import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginRequest } from "../auth-config";

const defaultState = {
    user: null,
    userIsLoading: false,
};

export const AuthContext = createContext({
    ...defaultState,
    setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const useIsAuthenticated = () => {
    const msalIsAuthenticated = useMsalIsAuthenticated();
    const { accessToken } = useAccessToken();
    const { user } = useAuth();

    return useMemo(
        () => msalIsAuthenticated && !!accessToken && !!user,
        [msalIsAuthenticated, accessToken, user]
    );
};

export const useLogin = () => {
    const { instance: msalInstance } = useMsal();

    return useCallback(async () => {
        try {
            return await msalInstance.loginRedirect(loginRequest);
        } catch (e) {
            console.error(e);
        }
    }, [msalInstance]);
};

export const useAccessToken = () => {
    const { instance: msalInstance, accounts: msalAccounts } = useMsal();
    const msalAccount = useAccount(msalAccounts[0] || {});
    const [accessTokenState, setAccessTokenState] = useState({
        accessToken: null,
        accessTokenIsLoading: true,
    });

    useEffect(() => {
        (async () => {
            // Request the token silently
            try {
                const { accessToken } = await msalInstance.acquireTokenSilent({
                    ...loginRequest,
                    account: msalAccount,
                });
                setAccessTokenState({
                    accessToken,
                    accessTokenIsLoading: false,
                });
            } catch (e) {
                setAccessTokenState({
                    accessToken: null,
                    accessTokenIsLoading: false,
                });
            }
        })();
    }, [msalInstance, msalAccount]);

    return accessTokenState;
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(defaultState);

    const setUser = useCallback((newAuthState) => {
        setAuthState(newAuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
