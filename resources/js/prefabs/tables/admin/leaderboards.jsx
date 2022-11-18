import { createColumnHelper } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import Badge from "../../../components/badge";
import Link from "../../../components/link";
import { getTheme } from "../../../themes";

const columnHelper = createColumnHelper();

export const columns = (handleOpenEditModal) => [
    columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        sortDescFirst: false,
        meta: {
            cell: {
                renderFn: (cell, children, className) => (
                    <Link
                        as="span"
                        className={className}
                        onClick={() => handleOpenEditModal(null /*cell.row.original*/)}
                    >
                        {children}
                    </Link>
                ),
            },
        },
    }),
    columnHelper.accessor("theme", {
        id: "theme",
        header: "Theme",
        sortDescFirst: false,
        cell: ({ getValue }) => {
            const theme = getTheme(getValue());
            return <Badge color={theme.badgeColor}>{theme.name}</Badge>;
        },
        meta: {
            cell: { wrapperClassName: "text-center", className: "hidden sm:table-cell" },
            header: { wrapperClassName: "justify-center", className: "hidden sm:table-cell" },
        },
    }),
    columnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Created",
        sortDescFirst: false,
        cell: ({ getValue }) => format(parseISO(getValue()), "dd/MM/yyyy"),
        meta: {
            cell: { className: "hidden sm:table-cell" },
            header: { className: "hidden sm:table-cell" },
        },
    }),
];
