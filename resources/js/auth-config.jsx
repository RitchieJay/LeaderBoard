export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_AUTH_CLIENT_ID,
        authority: import.meta.env.VITE_AZURE_AUTH_AUTHORITY,
        redirectUri: import.meta.env.VITE_AZURE_AUTH_REDIRECT_URI,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

export const loginRequest = {
    scopes: [`${import.meta.env.VITE_AZURE_AUTH_CLIENT_ID}/.default`],
};
