import { useEffect } from "react";
import { usePage } from "../../contexts/page";

const AdminLeaderboardsPage = () => {
    const { setupPage } = usePage();

    // Configure the page
    useEffect(() => {
        setupPage({
            title: "Leaderboards",
            tabs: [],
            activeTab: null,
        });
    }, [setupPage]);

    return <p>Leaderboards page!</p>;
};

AdminLeaderboardsPage.propTypes = {};

export default AdminLeaderboardsPage;
