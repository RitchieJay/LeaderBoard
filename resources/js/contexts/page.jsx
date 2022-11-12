import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

export const PageContext = createContext({
    pageTitle: null,
    setPageTitle: () => {},
});

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState(null);

    const setPageAndDocumentTitle = (newPageTitle) => {
        setPageTitle(newPageTitle);
        document.title = `${newPageTitle} | ${import.meta.env.VITE_APP_NAME}`;
    };

    return (
        <PageContext.Provider
            value={{
                pageTitle,
                setPageTitle: setPageAndDocumentTitle,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

PageProvider.propTypes = {
    children: PropTypes.node,
};
