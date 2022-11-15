import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import { useGetUsers } from "../../api/users";
import Badge from "../../components/badge";
import Link from "../../components/link";
import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { usePage } from "../../contexts/page";
import { sortFullName } from "../../utils/table";

const pageTabs = [
    { value: "active", name: "Active" },
    { value: "inactive", name: "Inactive" },
];

const columnHelper = createColumnHelper();
const usersTableColumns = [
    columnHelper.accessor("displayName", {
        id: "displayName",
        header: "Username",
        sortDescFirst: false,
        meta: {
            cell: {
                renderFn: (cell, children, className) => (
                    <Link className={className} to={`/admin/users/${cell.getValue()}/edit`}>
                        {children}
                    </Link>
                ),
            },
        },
    }),
    columnHelper.accessor((row) => `${row.privateForename} ${row.privateSurname}`, {
        id: "name",
        header: "Name",
        sortDescFirst: false,
        sortingFn: (a, b) =>
            sortFullName(
                { forename: a.original.privateForename, surname: a.original.privateSurname },
                { forename: b.original.privateForename, surname: b.original.privateSurname }
            ),
        meta: {
            cell: { className: "hidden sm:table-cell" },
            header: { className: "hidden sm:table-cell" },
        },
    }),
    columnHelper.accessor("privateUsername", {
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
    }),
];

const AdminUsersPage = () => {
    const { setPageTitle, setPageTabs, activePageTab, setActivePageTab } = usePage();
    const { data: users = [], isFetching: isLoadingUsers } = useGetUsers();

    // Configure the page
    useEffect(() => {
        setPageTitle("Users");
        setPageTabs(pageTabs);
        setActivePageTab(pageTabs[0].value);
    }, [setPageTitle, setPageTabs, setActivePageTab]);

    // Define the table data
    const activeUsers = useMemo(() => {
        return users.filter((u) => u.isActive);
    }, [users]);
    const inactiveUsers = useMemo(() => {
        return users.filter((u) => !u.isActive);
    }, [users]);

    // Loading state
    if ((isLoadingUsers && activeUsers.length < 1) || !activePageTab) {
        return (
            <div className="flex flex-row items-center justify-center space-x-2">
                <Spinner className="h-5 w-5 text-gray-600" />
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    return (
        <>
            {activePageTab === "active" && <Table data={activeUsers} columns={usersTableColumns} />}
            {activePageTab === "inactive" && <Table data={inactiveUsers} columns={usersTableColumns} />}
        </>
    );
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
