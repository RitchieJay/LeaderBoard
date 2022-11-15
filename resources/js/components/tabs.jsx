import classNames from "classnames";
import PropTypes from "prop-types";

const Tabs = ({ tabs, activeTab, onTabChange, className, ...rest }) => (
    <div {...rest} className={className}>
        <nav className="flex space-x-2" aria-label="Tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    type="button"
                    className={classNames(
                        "rounded-md px-3 py-1.5 text-sm font-medium",
                        activeTab && activeTab === tab.value
                            ? "bg-brand-100 text-brand-700"
                            : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => onTabChange(tab)}
                >
                    {tab.name}
                </button>
            ))}
        </nav>
    </div>
);

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    activeTab: PropTypes.string,
    onTabChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Tabs;
