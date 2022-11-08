import { createContext, useCallback, useContext, useState } from "react";

export const NavigationContext = createContext({
    pageTitle: null,
    setPageTitle: () => {},
});

export const NavigationProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState(null);

    const setPageAndDocumentTitle = useCallback((newPageTitle) => {
        setPageTitle(newPageTitle);
        document.title = `${newPageTitle} | ${import.meta.env.VITE_APP_NAME}`;
    }, []);

    return (
        <NavigationContext.Provider
            value={{
                pageTitle,
                setPageTitle: setPageAndDocumentTitle,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationContext = () => useContext(NavigationContext);
