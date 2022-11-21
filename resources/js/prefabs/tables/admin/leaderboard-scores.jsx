import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columns = () => [
    columnHelper.accessor("rank", {
        id: "rank",
        header: "Rank",
        sortDescFirst: false,
        cell: ({ getValue }) => `#${getValue()}`,
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
];
