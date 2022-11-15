import classNames from "classnames";
import PropTypes from "prop-types";
import Pagination from "./pagination";

const TableFooter = ({ currentPageIndex, pageSize, totalPages, totalRows, onPaginationChange, className, ...rest }) => {
    const showingFrom = totalRows < 1 ? 0 : currentPageIndex * pageSize + 1;
    const showingTo = Math.min(currentPageIndex * pageSize + pageSize, totalRows);

    return (
        <div {...rest} className={classNames("flex flex-row items-center justify-between", className)}>
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    {"Showing "}
                    <span className="font-medium">{showingFrom}</span>
                    {showingTo < 2 ? (
                        ` result${showingTo === 1 ? "" : "s"}`
                    ) : (
                        <>
                            {" to "}
                            <span className="font-medium">{showingTo}</span>
                            {" of "}
                            <span className="font-medium">{totalRows}</span>
                            {" results"}
                        </>
                    )}
                </p>
            </div>
            <div>
                <Pagination currentPageIndex={currentPageIndex} totalPages={totalPages} onChange={onPaginationChange} />
            </div>
        </div>
    );
};

TableFooter.propTypes = {
    currentPageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    onPaginationChange: PropTypes.func,
    className: PropTypes.string,
};

export default TableFooter;
