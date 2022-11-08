import { useEffect } from "react";
import { useNavigationContext } from "../../contexts/navigation";

const AdminLeaderboardsPage = () => {
    const { setPageTitle } = useNavigationContext();

    useEffect(() => {
        setPageTitle("Leaderboards");
    }, [setPageTitle]);

    return <p>Leaderboards page!</p>;
};

AdminLeaderboardsPage.propTypes = {};

export default AdminLeaderboardsPage;
