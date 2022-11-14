import { createColumnHelper } from "@tanstack/react-table";
import { data } from "autoprefixer";
import { useEffect, useMemo } from "react";
import { useGetUsers } from "../../api/users";
import Badge from "../../components/badge";
import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { usePage } from "../../contexts/page";

const columnHelper = createColumnHelper();
const usersTableColumns = [
    columnHelper.accessor("displayName", { id: "displayName", header: "Username" }),
    columnHelper.accessor("privateForename", { id: "forename", header: "Forename" }),
    columnHelper.accessor("privateSurname", { id: "surname", header: "Surname" }),
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
    if (isLoadingUsers && data.length < 1) {
        return (
            <div className="flex flex-row items-center justify-center space-x-2">
                <Spinner className="h-6 w-6 text-gray-600" />
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return <Table data={activeUsers} columns={usersTableColumns} />;
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
