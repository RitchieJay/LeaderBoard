import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";
import { setDocumentTitle } from "../utils/app";

const defaultState = {
    title: null,
    tabs: [],
    activeTab: null,
};

export const PageContext = createContext({
    ...defaultState,
    setupPage: () => {},
    setActiveTab: () => {},
});

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
    const [pageState, setPageState] = useState(defaultState);

    const setupPage = useCallback((newPageConfig) => {
        setPageState(newPageConfig);
        setDocumentTitle(newPageConfig.title ?? null);
    }, []);

    const setActiveTab = useCallback(
        (newActiveTab) => {
            setPageState({
                ...pageState,
                activeTab: newActiveTab,
            });
        },
        [pageState]
    );

    return (
        <PageContext.Provider
            value={{
                ...pageState,
                setupPage,
                setActiveTab,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

PageProvider.propTypes = {
    children: PropTypes.node,
};
