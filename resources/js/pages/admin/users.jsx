import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useMemo, useState } from "react";
import { useGetUsers } from "../../api/users";
import Button from "../../components/button";
import Spinner from "../../components/spinner";
import Table from "../../components/table";
import { usePage } from "../../contexts/page";
import AdminEditUserModal from "../../modals/admin/edit-user";
import { columns as usersTableColumns } from "../../tables/admin/users";

const pageTabs = [
    { value: "active", name: "Active" },
    { value: "inactive", name: "Inactive" },
];

const AdminUsersPage = () => {
    const { setPageTitle, setPageTabs, activePageTab, setActivePageTab } = usePage();
    const { data: users = [], isFetching: isLoadingUsers } = useGetUsers();
    const [editingDisplayName, setEditingDisplayName] = useState(null);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

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

    // Define the modal callbacks
    const handleOpenEditModal = (displayName) => {
        setEditingDisplayName(displayName);
        setEditModalIsOpen(true);
    };

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
            <AdminEditUserModal
                isOpen={editModalIsOpen}
                onClose={() => setEditModalIsOpen(false)}
                onCloseFinish={() => setEditingDisplayName(null)}
                displayName={editingDisplayName}
            />
        </>
    );
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
