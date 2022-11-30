import { createColumnHelper } from "@tanstack/react-table";
import Button from "../../../components/button";

const columnHelper = createColumnHelper();

export const columns = (handleDeleteScore) => [
    columnHelper.accessor("rank", {
        id: "rank",
        header: "Rank",
        sortDescFirst: false,
        cell: ({ getValue }) => `#${getValue()}`,
        meta: {
            cell: { className: "hidden md:table-cell" },
            header: { className: "hidden md:table-cell" },
        },
    }),
    columnHelper.accessor("user.displayName", {
        id: "displayName",
        header: "Username",
        sortDescFirst: false,
    }),
    columnHelper.accessor("score", {
        id: "score",
        header: "Score",
        sortDescFirst: false,
        meta: {
            cell: { wrapperClassName: "text-center" },
            header: { wrapperClassName: "justify-center" },
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
                            onClick={() => handleDeleteScore(cell.row.original)}
                        >
                            Delete
                        </Button>
                    </div>
                ),
            },
            header: { wrapperClassName: "justify-center" },
        },
    }),
];
