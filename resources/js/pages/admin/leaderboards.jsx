import { useEffect } from "react";
import { usePage } from "../../contexts/page";

const AdminLeaderboardsPage = () => {
    const { setPageTitle, setPageTabs, setActivePageTab } = usePage();

    // Configure the page
    useEffect(() => {
        setPageTitle("Leaderboards");
        setPageTabs([]);
        setActivePageTab(null);
    }, [setPageTitle, setPageTabs, setActivePageTab]);

    return <p>Leaderboards page!</p>;
};

AdminLeaderboardsPage.propTypes = {};

export default AdminLeaderboardsPage;
