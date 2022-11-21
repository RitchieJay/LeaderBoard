import { createColumnHelper } from "@tanstack/react-table";
import Badge from "../../../components/badge";
import Button from "../../../components/button";
import { sortFullName } from "../../../utils/table";

const columnHelper = createColumnHelper();

export const columns = (handleOpenEditModal) => [
    columnHelper.accessor("displayName", {
        id: "displayName",
        header: "Username",
        sortDescFirst: false,
    }),
    columnHelper.accessor((row) => `${row.person.forename} ${row.person.surname}`, {
        id: "name",
        header: "Name",
        sortDescFirst: false,
        sortingFn: (a, b) =>
            sortFullName(
                { forename: a.original.person.forename, surname: a.original.person.surname },
                { forename: b.original.person.forename, surname: b.original.person.surname }
            ),
        meta: {
            cell: { className: "hidden md:table-cell" },
            header: { className: "hidden md:table-cell" },
        },
    }),
    columnHelper.accessor((row) => row.person.username, {
        id: "email",
        header: "Email",
        sortDescFirst: false,
        meta: {
            cell: { className: "hidden lg:table-cell" },
            header: { className: "hidden lg:table-cell" },
        },
    }),
    columnHelper.accessor("isAdmin", {
        id: "role",
        header: "Role",
        sortDescFirst: false,
        cell: ({ getValue }) =>
            getValue() ? <Badge color="brand">Admin</Badge> : <Badge color="default">User</Badge>,
        meta: {
            cell: { wrapperClassName: "hidden sm:table-cell text-center" },
            header: { wrapperClassName: "hidden sm:flex" },
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        meta: {
            cell: {
                className: "justify-center",
                renderFn: (cell, children, className) => (
                    <div className="flex flex-row items-center justify-center">
                        <Button
                            size="sm"
                            type="button"
                            onClick={() => handleOpenEditModal(cell.row.original)}
                        >
                            Edit
                        </Button>
                    </div>
                ),
            },
            header: { wrapperClassName: "justify-center" },
        },
    }),
];
