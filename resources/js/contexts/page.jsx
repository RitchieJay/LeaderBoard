import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";

export const PageContext = createContext({
    pageTitle: null,
    setPageTitle: () => {},
    pageTabs: [],
    setPageTabs: () => {},
    activePageTab: null,
    setActivePageTab: () => {},
});

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
    const [pageTitle, setPageTitle] = useState(null);
    const [pageTabs, setPageTabs] = useState([]);
    const [activePageTab, setActivePageTab] = useState(null);

    const setPageAndDocumentTitle = useCallback((newPageTitle) => {
        setPageTitle(newPageTitle);
        document.title = `${newPageTitle} | ${import.meta.env.VITE_APP_NAME}`;
    }, []);

    return (
        <PageContext.Provider
            value={{
                pageTitle,
                setPageTitle: setPageAndDocumentTitle,
                pageTabs,
                setPageTabs,
                activePageTab,
                setActivePageTab,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

PageProvider.propTypes = {
    children: PropTypes.node,
};
