import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { fuzzyFilter } from "../utils/table";
import TableFooter from "./table-footer";
import TableHeader from "./table-header";

const Table = ({ data, columns }) => {
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
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
    });

    const pagination = table.getState().pagination;

    return (
        <>
            <TableHeader
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
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        scope="col"
                                        className={classNames(
                                            "p-3 text-left text-sm font-bold text-gray-900",
                                            header.column.columnDef?.meta?.cellClassName
                                        )}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white">
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={classNames(
                                            "whitespace-nowrap p-3 text-sm font-normal text-gray-900",
                                            cell.column.columnDef?.meta?.cellClassName
                                        )}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TableFooter
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
};

export default Table;
