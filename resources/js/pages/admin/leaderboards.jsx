import { useEffect } from "react";
import { usePage } from "../../contexts/page";

const AdminLeaderboardsPage = () => {
    const { setPageTitle } = usePage();

    useEffect(() => {
        setPageTitle("Leaderboards");
    }, [setPageTitle]);

    return <p>Leaderboards page!</p>;
};

AdminLeaderboardsPage.propTypes = {};

export default AdminLeaderboardsPage;
