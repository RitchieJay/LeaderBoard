import { useParams } from "react-router-dom";
import { useGetLeaderboardByUrlName } from "../api/leaderboards";

const LeaderboardPage = () => {
    const { urlName } = useParams();

    // Data
    const { data: leaderboard } = useGetLeaderboardByUrlName(urlName);

    return <p>{leaderboard?.name}</p>;
};

LeaderboardPage.propTypes = {};

export default LeaderboardPage;
