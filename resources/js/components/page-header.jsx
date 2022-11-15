import classNames from "classnames";
import PropTypes from "prop-types";
import { usePage } from "../contexts/page";
import Heading from "./heading";
import Tabs from "./tabs";

const PageHeader = ({ className, ...rest }) => {
    const { pageTitle, pageTabs, activePageTab, setActivePageTab } = usePage();

    return (
        <header className={classNames("bg-white shadow-sm", className)} {...rest}>
            <div className="mx-auto flex h-14 max-w-7xl flex-row items-center justify-between space-x-4 px-4 sm:h-16 sm:px-6 lg:px-8">
                <div>
                    {pageTitle && (
                        <Heading as="h1" level={2}>
                            {pageTitle}
                        </Heading>
                    )}
                </div>
                {pageTabs && pageTabs.length > 0 && (
                    <Tabs
                        tabs={pageTabs}
                        activeTab={activePageTab}
                        onTabChange={(tab) => setActivePageTab(tab.value)}
                    />
                )}
            </div>
        </header>
    );
};

PageHeader.propTypes = {
    className: PropTypes.string,
};

export default PageHeader;
