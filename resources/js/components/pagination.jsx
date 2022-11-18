import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useCallback } from "react";

const buttons = [
    { key: "page-start", icon: ChevronDoubleLeftIcon, updatePageFn: (pageIndex, totalPages) => 0 },
    {
        key: "page-prev",
        icon: ChevronLeftIcon,
        updatePageFn: (pageIndex, totalPages) => pageIndex - 1,
    },
    {
        key: "page-next",
        icon: ChevronRightIcon,
        updatePageFn: (pageIndex, totalPages) => pageIndex + 1,
    },
    {
        key: "page-end",
        icon: ChevronDoubleRightIcon,
        updatePageFn: (pageIndex, totalPages) => totalPages - 1,
    },
];

const Pagination = ({
    as: Tag = "nav",
    currentPageIndex,
    totalPages,
    onChange,
    className,
    ...rest
}) => {
    const handleChange = useCallback(
        (updatePageFn) => {
            let newCurrentPageIndex = updatePageFn(currentPageIndex, totalPages);
            newCurrentPageIndex = Math.min(Math.max(newCurrentPageIndex, 0), totalPages - 1);
            if (newCurrentPageIndex !== currentPageIndex) {
                onChange(newCurrentPageIndex);
            }
        },
        [currentPageIndex, totalPages, onChange]
    );

    return (
        <Tag
            {...rest}
            className={classNames("inline-flex -space-x-px rounded-md shadow-sm", className)}
            aria-label="Pagination"
        >
            {buttons.map((btn, btnIdx) => (
                <button
                    key={btn.key}
                    type="button"
                    className={classNames(
                        "relative z-10 inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-gray-600 hover:bg-gray-50 focus:z-20 focus:outline-brand-600",
                        {
                            "rounded-l-md": btnIdx === 0,
                            "rounded-r-md": btnIdx === buttons.length - 1,
                        }
                    )}
                    onClick={() => handleChange(btn.updatePageFn)}
                >
                    <btn.icon className="h-4 w-4" />
                </button>
            ))}
        </Tag>
    );
};

Pagination.propTypes = {
    as: PropTypes.elementType,
    currentPageIndex: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Pagination;
