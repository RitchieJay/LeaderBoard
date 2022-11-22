import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useMemo, useState } from "react";
import { useGetLeaderboards } from "../../api/leaderboards";
import Button from "../../components/button";
import PageLoader from "../../components/page-loader";
import Table from "../../components/table";
import { usePage } from "../../contexts/page";
import AdminEditLeaderboardModal from "../../prefabs/modals/admin/edit-leaderboard";
import AdminEditLeaderboardScoresModal from "../../prefabs/modals/admin/edit-leaderboard-scores";
import { columns as leaderboardsTableColumns } from "../../prefabs/tables/admin/leaderboards";

const pageTabs = [
    { value: "active", name: "Active" },
    { value: "archived", name: "Archived" },
];

const AdminLeaderboardsPage = () => {
    const { setupPage, activeTab: activePageTab } = usePage();
    const { data: leaderboards = [], isFetching: isLoadingLeaderboards } = useGetLeaderboards();

    // Configure modal state
    const [editModalState, setEditModalState] = useState({
        isRendered: false,
        isOpen: false,
        props: {
            user: null,
        },
    });
    const [scoresModalState, setScoresModalState] = useState({
        isRendered: false,
        isOpen: false,
        props: {
            leaderboard: null,
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
    const activeLeaderboards = useMemo(
        () => leaderboards.filter((l) => l.isActive),
        [leaderboards]
    );
    const archivedLeaderboards = useMemo(
        () => leaderboards.filter((l) => !l.isActive),
        [leaderboards]
    );

    // Define the modal callbacks
    const handleOpenEditModal = (leaderboard = null) => {
        setEditModalState({
            isRendered: true,
            isOpen: true,
            props: {
                leaderboard,
            },
        });
    };
    const handleOpenScoresModal = (leaderboard) => {
        setScoresModalState({
            isRendered: true,
            isOpen: true,
            props: {
                leaderboard,
            },
        });
    };

    // Loading state
    if ((isLoadingLeaderboards && leaderboards.length < 1) || !activePageTab) {
        return <PageLoader />;
    }

    return (
        <>
            {/* Leaderboards tables */}
            {activePageTab === "active" && (
                <Table
                    data={activeLeaderboards}
                    columns={leaderboardsTableColumns(handleOpenEditModal, handleOpenScoresModal)}
                    headerProps={{
                        globalFilterProps: {
                            placeholder: "Search leaderboards...",
                        },
                        rightPanelContent: (
                            <Button
                                color="brand"
                                type="button"
                                onClick={() => handleOpenEditModal(null)}
                            >
                                <PlusCircleIcon className="h-5 w-5" />
                                <span className="ml-1.5 hidden sm:inline">New Leaderboard</span>
                            </Button>
                        ),
                    }}
                />
            )}
            {activePageTab === "archived" && (
                <Table
                    data={archivedLeaderboards}
                    columns={leaderboardsTableColumns(handleOpenEditModal)}
                    headerProps={{
                        globalFilterProps: {
                            placeholder: "Search leaderboards...",
                        },
                    }}
                />
            )}

            {/* Create/edit leaderboard modal */}
            {editModalState.isRendered && (
                <AdminEditLeaderboardModal
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

            {/* Create/edit scores modal */}
            {scoresModalState.isRendered && (
                <AdminEditLeaderboardScoresModal
                    {...scoresModalState.props}
                    isOpen={scoresModalState.isOpen}
                    onClose={() => {
                        setScoresModalState({
                            ...scoresModalState,
                            isOpen: false,
                        });
                    }}
                    onCloseFinish={() => {
                        setScoresModalState({
                            ...scoresModalState,
                            isRendered: false,
                        });
                    }}
                />
            )}
        </>
    );
};

AdminLeaderboardsPage.propTypes = {};

export default AdminLeaderboardsPage;
