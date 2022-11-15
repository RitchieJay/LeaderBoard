import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { useGetUsers } from "../../api/users";
import Badge from "../../components/badge";
import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { usePage } from "../../contexts/page";

const columnHelper = createColumnHelper();
const usersTableColumns = [
    columnHelper.accessor("displayName", { id: "displayName", header: "Username" }),
    columnHelper.accessor((row) => `${row.privateForename} ${row.privateSurname}`, {
        id: "name",
        header: "Name",
        meta: {
            cellClassName: "hidden md:table-cell",
            headerClassName: "hidden md:table-cell",
        },
    }),
    columnHelper.accessor("privateUsername", {
        id: "email",
        header: "Email",
        meta: {
            cellClassName: "hidden md:table-cell",
            headerClassName: "hidden md:table-cell",
        },
    }),
    columnHelper.accessor("isAdmin", {
        id: "role",
        header: "Role",
        cell: ({ getValue }) => (getValue() ? <Badge color="brand">Admin</Badge> : <Badge color="default">User</Badge>),
    }),
];

const AdminUsersPage = () => {
    const { setPageTitle } = usePage();
    const { data: users = [], isFetching: isLoadingUsers } = useGetUsers();

    useEffect(() => {
        setPageTitle("Users");
    }, [setPageTitle]);

    const activeUsers = useMemo(() => {
        return users.filter((u) => u.isActive);
    }, [users]);

    // Loading state
    if (isLoadingUsers && activeUsers.length < 1) {
        return (
            <div className="flex flex-row items-center justify-center space-x-2">
                <Spinner className="h-5 w-5 text-gray-600" />
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return <Table data={activeUsers} columns={usersTableColumns} />;
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
