import classNames from "classnames";
import PropTypes from "prop-types";
import Input from "./input";

const TableHeader = ({ className, globalFilterProps, globalFilter, onGlobalFilterChange, ...rest }) => {
    return (
        <div {...rest} className={classNames("mb-4 flex flex-row items-center justify-start", className)}>
            <div className="w-full sm:w-80 lg:w-96">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={onGlobalFilterChange}
                    {...globalFilterProps}
                />
            </div>
        </div>
    );
};

TableHeader.propTypes = {
    className: PropTypes.string,
    globalFilterProps: PropTypes.object,
    globalFilter: PropTypes.string.isRequired,
    onGlobalFilterChange: PropTypes.func.isRequired,
};

export default TableHeader;
