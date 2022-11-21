import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import { format, parseISO } from "date-fns";
import Badge from "../../../components/badge";
import Button from "../../../components/button";
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
                        className={classNames("inline-block", className)}
                        to={`/l/${cell.row.original.urlName}`}
                        target="_blank"
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
            cell: { className: "hidden md:table-cell" },
            header: { className: "hidden md:table-cell" },
        },
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        meta: {
            cell: {
                className: "justify-center",
                renderFn: (cell, children, className) => (
                    <div className="flex flex-row items-center justify-center space-x-2">
                        <Button
                            size="sm"
                            type="button"
                            onClick={() => handleOpenEditModal(cell.row.original)}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            type="button"
                            onClick={() => console.log("SCORE MODAL HERE")}
                        >
                            Scores
                        </Button>
                    </div>
                ),
            },
            header: { wrapperClassName: "justify-center" },
        },
    }),
];
