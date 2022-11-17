import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useMemo, useState } from "react";
import { useGetUsers } from "../../api/users";
import Button from "../../components/button";
import PageLoader from "../../components/page-loader";
import Table from "../../components/table";
import { usePage } from "../../contexts/page";
import AdminEditUserModal from "../../prefabs/modals/admin/edit-user";
import { columns as usersTableColumns } from "../../prefabs/tables/admin/users";

const pageTabs = [
    { value: "active", name: "Active" },
    { value: "inactive", name: "Inactive" },
];

const AdminUsersPage = () => {
    const { setupPage, activeTab: activePageTab } = usePage();
    const { data: users = [], isFetching: isLoadingUsers } = useGetUsers();

    // Configure edit modal state
    const [editModalState, setEditModalState] = useState({
        isRendered: false,
        isOpen: false,
        props: {
            user: null,
        },
    });

    // Configure the page
    useEffect(() => {
        setupPage({
            title: "Leaderboards",
            tabs: pageTabs,
            activeTab: pageTabs[0].value,
        });
    }, [setupPage]);

    // Define the table data
    const activeUsers = useMemo(() => users.filter((u) => u.isActive), [users]);
    const inactiveUsers = useMemo(() => users.filter((u) => !u.isActive), [users]);

    // Define the modal callbacks
    const handleOpenEditModal = (user) => {
        setEditModalState({
            isRendered: true,
            isOpen: true,
            props: {
                user,
            },
        });
    };

    // Loading state
    if ((isLoadingUsers && users.length < 1) || !activePageTab) {
        return <PageLoader />;
    }

    return (
        <>
            {/* User tables */}
            {activePageTab === "active" && (
                <Table
                    data={activeUsers}
                    columns={usersTableColumns(handleOpenEditModal)}
                    headerProps={{
                        rightPanelContent: (
                            <Button color="brand" type="button" onClick={() => handleOpenEditModal(null)}>
                                <PlusCircleIcon className="h-5 w-5" />
                                <span className="ml-1.5 hidden sm:inline">New User</span>
                            </Button>
                        ),
                    }}
                />
            )}
            {activePageTab === "inactive" && (
                <Table data={inactiveUsers} columns={usersTableColumns(handleOpenEditModal)} />
            )}

            {/* Create/edit user modal */}
            {editModalState.isRendered && (
                <AdminEditUserModal
                    {...editModalState.props}
                    isOpen={editModalState.isOpen}
                    onClose={() => {
                        setEditModalState({
                            ...editModalState,
                            isOpen: false,
                        });
                    }}
                    onCloseFinish={() => {
                        setEditModalState({
                            ...editModalState,
                            isRendered: false,
                        });
                    }}
                />
            )}
        </>
    );
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
