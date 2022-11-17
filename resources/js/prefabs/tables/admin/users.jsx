import { createColumnHelper } from "@tanstack/react-table";
import Badge from "../../../components/badge";
import Link from "../../../components/link";
import { sortFullName } from "../../../utils/table";

const columnHelper = createColumnHelper();

export const columns = (handleOpenEditModal) => [
    columnHelper.accessor("displayName", {
        id: "displayName",
        header: "Username",
        sortDescFirst: false,
        meta: {
            cell: {
                renderFn: (cell, children, className) => (
                    <Link as="span" className={className} onClick={() => handleOpenEditModal(cell.row.original)}>
                        {children}
                    </Link>
                ),
            },
        },
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
            cell: { className: "hidden sm:table-cell" },
            header: { className: "hidden sm:table-cell" },
        },
    }),
    columnHelper.accessor((row) => row.person.username, {
        id: "email",
        header: "Email",
        sortDescFirst: false,
        meta: {
            cell: { className: "hidden md:table-cell" },
            header: { className: "hidden md:table-cell" },
        },
    }),
    columnHelper.accessor("isAdmin", {
        id: "role",
        header: "Role",
        sortDescFirst: false,
        cell: ({ getValue }) => (getValue() ? <Badge color="brand">Admin</Badge> : <Badge color="default">User</Badge>),
        meta: {
            cell: { wrapperClassName: "text-center" },
            header: { wrapperClassName: "justify-center" },
        },
    }),
];
