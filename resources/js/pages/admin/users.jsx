import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { useGetUsers } from "../../api/users";
import TableFooter from "../../components/table-footer";
import { usePage } from "../../contexts/page";

const columnHelper = createColumnHelper();
const usersTableColumns = [
    columnHelper.accessor("displayName", { id: "displayName", header: "Username" }),
    columnHelper.accessor("privateForename", { id: "forename", header: "Forename" }),
    columnHelper.accessor("privateSurname", { id: "surname", header: "Surname" }),
];

const AdminUsersPage = () => {
    const { setPageTitle } = usePage();
    const { data: users = [] } = useGetUsers();

    useEffect(() => {
        setPageTitle("Users");
    }, [setPageTitle]);

    const activeUsers = useMemo(() => {
        return users.filter((u) => u.isActive);
    }, [users]);

    const activeUsersTable = useReactTable({
        data: activeUsers,
        columns: usersTableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const activeUsersTablePagination = activeUsersTable.getState().pagination;

    return (
        <>
            <div className="mb-4 overflow-hidden rounded-md shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        {activeUsersTable.getHeaderGroups().map((headerGroup) => (
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
                        {activeUsersTable.getRowModel().rows.map((row) => (
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
                currentPageIndex={activeUsersTablePagination.pageIndex}
                pageSize={activeUsersTablePagination.pageSize}
                totalPages={activeUsersTable.getPageCount()}
                totalRows={activeUsers.length}
                onPaginationChange={(newPageIndex) => {
                    console.log(newPageIndex);
                    activeUsersTable.setPageIndex(newPageIndex);
                }}
            />
        </>
    );
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
