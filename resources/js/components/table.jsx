import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import PropTypes from "prop-types";
import TableFooter from "./table-footer";

const Table = ({ data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const pagination = table.getState().pagination;

    return (
        <>
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
                                        className="p-3 text-left text-sm font-bold text-gray-900"
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
                                        className="whitespace-nowrap p-3 text-sm font-normal text-gray-900"
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
                totalRows={data.length}
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
