import classNames from "classnames";
import PropTypes from "prop-types";
import Input from "./input";

const TableHeader = ({
    className,
    globalFilterProps,
    globalFilter,
    onGlobalFilterChange,
    rightPanelContent,
    ...rest
}) => {
    return (
        <div {...rest} className={classNames("mb-4 flex flex-row items-center justify-between space-x-3", className)}>
            <div className="flex-1 sm:w-80 sm:flex-initial lg:w-96">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={onGlobalFilterChange}
                    {...globalFilterProps}
                />
            </div>
            {rightPanelContent}
        </div>
    );
};

TableHeader.propTypes = {
    className: PropTypes.string,
    globalFilterProps: PropTypes.object,
    globalFilter: PropTypes.string.isRequired,
    onGlobalFilterChange: PropTypes.func.isRequired,
    rightPanelContent: PropTypes.node,
};

export default TableHeader;
