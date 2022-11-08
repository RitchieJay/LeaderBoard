import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const NavigationContext = createContext({
    pageTitle: null,
    setPageTitle: () => {},
});

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState(null);

    const setPageAndDocumentTitle = (newPageTitle) => {
        setPageTitle(newPageTitle);
        document.title = `${newPageTitle} | ${import.meta.env.VITE_APP_NAME}`;
    };

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

NavigationProvider.propTypes = {
    children: PropTypes.node,
};
