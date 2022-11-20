import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useGetLeaderboardByUrlName } from "../api/leaderboards";
import Heading from "../components/heading";
import Logo from "../components/logo";
import PageLoader from "../components/page-loader";
import UserScoreCard from "../components/user-score-card";
import { getTheme } from "../themes";
import { throwNotFound } from "../utils/routing";

const LeaderboardPage = () => {
    const { urlName } = useParams();

    // Data
    const { data: leaderboard, isLoading: isLoadingLeaderboard } =
        useGetLeaderboardByUrlName(urlName);
    const { theme } = getTheme(leaderboard?.theme);

    const scores = [
        { rank: 1, user: { displayName: "danielcrowe" }, score: 1900 },
        { rank: 2, user: { displayName: "richardjohnson" }, score: 1342 },
        { rank: 3, user: { displayName: "mdavies" }, score: 984 },
        { rank: 4, user: { displayName: "aedge" }, score: 522 },
        { rank: 5, user: { displayName: "jamesbond_007" }, score: 235 },
        { rank: 6, user: { displayName: "someone_else" }, score: 124 },
        { rank: 7, user: { displayName: "someone_else" }, score: 124 },
        { rank: 8, user: { displayName: "someone_else" }, score: 124 },
        { rank: 9, user: { displayName: "someone_else" }, score: 124 },
        { rank: 10, user: { displayName: "someone_else" }, score: 124 },
        { rank: 11, user: { displayName: "someone_else" }, score: 124 },
        { rank: 12, user: { displayName: "someone_else" }, score: 124 },
        { rank: 13, user: { displayName: "someone_else" }, score: 124 },
        { rank: 14, user: { displayName: "someone_else" }, score: 124 },
        { rank: 15, user: { displayName: "someone_else" }, score: 124 },
        { rank: 16, user: { displayName: "someone_else" }, score: 124 },
        { rank: 17, user: { displayName: "someone_else" }, score: 124 },
    ];

    // If not found, throw a 404
    if (!isLoadingLeaderboard && !leaderboard) {
        throwNotFound();
    }

    return isLoadingLeaderboard ? (
        <div className="p-4 sm:p-6 lg:p-8">
            <PageLoader />
        </div>
    ) : (
        <>
            <div
                className={classNames(
                    "fixed top-0 left-0 z-0 h-full w-full",
                    theme.backgroundClasses
                )}
            >
                &nbsp;
            </div>
            <div className="relative z-10 min-h-full w-full overflow-y-auto sm:p-6 lg:p-8">
                <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-start">
                    <div className="flex flex-col items-center justify-start space-y-2 py-8 sm:space-y-3 sm:py-16">
                        <Logo color={theme.logoColor} />
                        <Heading className="text-center" level={1} color={theme.pageTitleColor}>
                            {leaderboard?.name}
                        </Heading>
                    </div>
                    <div
                        className={classNames(
                            "w-full flex-1 rounded-t-3xl p-4 sm:rounded-b-3xl lg:p-6",
                            theme.scoreCardContainerClasses
                        )}
                    >
                        {scores.map((score, scoreIdx) => (
                            <Fragment key={`${score.rank}`}>
                                {scoreIdx === 3 && (
                                    <div
                                        className={classNames(
                                            "mb-3 flex flex-row items-center justify-center sm:mb-4",
                                            theme.scoreCardDividerClasses
                                        )}
                                    >
                                        <EllipsisHorizontalIcon className="h-10 w-10" />
                                    </div>
                                )}
                                <UserScoreCard
                                    theme={theme.scoreCardClasses(
                                        score.rank,
                                        scoreIdx,
                                        scores.length
                                    )}
                                    rankPrefix={theme.rankPrefix}
                                    rank={score.rank}
                                    user={score.user}
                                    score={`${score.score}`}
                                />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

LeaderboardPage.propTypes = {};

export default LeaderboardPage;
