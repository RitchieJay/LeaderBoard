import classNames from "classnames";
import PropTypes from "prop-types";
import { usePage } from "../contexts/page";
import Heading from "./heading";
import Tabs from "./tabs";

const PageHeader = ({ className, ...rest }) => {
    const { title, tabs, activeTab, setActiveTab } = usePage();

    return (
        <header {...rest} className={classNames("bg-white shadow-sm", className)}>
            <div className="mx-auto flex h-14 max-w-7xl flex-row items-center justify-between space-x-4 px-4 sm:h-16 sm:px-6 lg:px-8">
                <div>
                    {title && (
                        <Heading as="h1" level={3}>
                            {title}
                        </Heading>
                    )}
                </div>
                {tabs && tabs.length > 0 && (
                    <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab.value)} />
                )}
            </div>
        </header>
    );
};

PageHeader.propTypes = {
    className: PropTypes.string,
};

export default PageHeader;
