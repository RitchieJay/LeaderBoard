import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { fuzzyFilter, renderCellValue, renderHeaderValue } from "../utils/table";
import TableFooter from "./table-footer";
import TableHeader from "./table-header";

const renderHeader = (header) => {
    const isSortable = header.column.getCanSort();
    const sortDir = header.column.getIsSorted();

    return (
        <th
            key={header.id}
            colSpan={header.colSpan}
            scope="col"
            className={classNames(
                "text-left text-sm font-bold text-gray-900",
                header.column.columnDef?.meta?.header?.className
            )}
        >
            <div
                className={classNames(
                    "flex flex-row items-center p-3",
                    {
                        "cursor-pointer select-none": isSortable,
                    },
                    header.column.columnDef?.meta?.header?.wrapperClassName
                )}
                onClick={header.column.getToggleSortingHandler()}
            >
                {renderHeaderValue(header)}
                {isSortable && (
                    <>
                        {sortDir === "asc" && <ChevronUpIcon className="ml-2 h-4 w-4" />}
                        {sortDir === "desc" && <ChevronDownIcon className="ml-2 h-4 w-4" />}
                        {!sortDir && <ChevronUpDownIcon className="ml-2 h-4 w-4" />}
                    </>
                )}
            </div>
        </th>
    );
};

const renderCell = (cell) => {
    const cellWrapperClasses = classNames(
        "p-3",
        cell.column.columnDef?.meta?.cell?.wrapperClassName
    );
    const cellValue = renderCellValue(cell);

    return (
        <td
            key={cell.id}
            className={classNames(
                "whitespace-nowrap p-0 text-sm font-normal text-gray-900",
                cell.column.columnDef?.meta?.cell?.className
            )}
        >
            {cell.column.columnDef?.meta?.cell?.renderFn ? (
                cell.column.columnDef?.meta?.cell?.renderFn(cell, cellValue, cellWrapperClasses)
            ) : (
                <div className={cellWrapperClasses}>{cellValue}</div>
            )}
        </td>
    );
};

const Table = ({ data, columns, headerProps, footerProps }) => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        onSortingChange: setSorting,
    });

    const pagination = table.getState().pagination;

    return (
        <>
            <TableHeader
                {...headerProps}
                globalFilterProps={{
                    placeholder: "Search users...",
                }}
                globalFilter={globalFilter || ""}
                onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
            />
            <div className="mb-4 overflow-hidden rounded-md shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => renderHeader(header))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white">
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => renderCell(cell))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TableFooter
                {...footerProps}
                currentPageIndex={pagination.pageIndex}
                pageSize={pagination.pageSize}
                totalPages={table.getPageCount()}
                totalRows={table.getPrePaginationRowModel().rows.length}
                onPaginationChange={(newPageIndex) => {
                    table.setPageIndex(newPageIndex);
                }}
            />
        </>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array.isRequired,
    headerProps: PropTypes.object,
    footerProps: PropTypes.object,
};

export default Table;
