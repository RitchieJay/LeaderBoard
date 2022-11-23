import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import React, { Fragment, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetLeaderboardByUrlName, useGetScoresForLeaderboard } from "../api/leaderboards";
import Heading from "../components/heading";
import Logo from "../components/logo";
import PageLoader from "../components/page-loader";
import Spinner from "../components/spinner";
import UserScoreCard from "../components/user-score-card";
import { getTheme } from "../themes";
import { setDocumentTitle } from "../utils/dom";
import { throwNotFound } from "../utils/routing";

const LeaderboardPage = () => {
    const { urlName } = useParams();

    // Data
    const { data: leaderboard, isLoading: isLoadingLeaderboard } =
        useGetLeaderboardByUrlName(urlName);
    const { data: scores = [], isLoading: isLoadingScores } = useGetScoresForLeaderboard(urlName);

    // Determine the theme
    const { theme } = getTheme(leaderboard?.theme);

    // If not found, throw a 404
    if (!isLoadingLeaderboard && !leaderboard) {
        throwNotFound();
    }

    // Determine where to insert a divider
    const scoreDividerIdx = useMemo(() => {
        for (let scoreIdx in scores) {
            if (scores[scoreIdx].rank > 3) {
                return +scoreIdx;
            }
        }
        return null;
    }, [scores]);

    // Set document title
    useEffect(() => {
        setDocumentTitle(leaderboard?.name ?? "Leaderboard");
    }, [leaderboard?.name]);

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
            <div className="relative z-10 w-full overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-start">
                    <div className="flex flex-col items-center justify-start space-y-2 py-8 sm:space-y-3 sm:py-16">
                        <Logo color={theme.logoColor} />
                        <Heading className="text-center" level={1} color={theme.pageTitleColor}>
                            {leaderboard?.name}
                        </Heading>
                    </div>
                    <div
                        className={classNames(
                            "w-full flex-1 rounded-3xl p-4 lg:p-6",
                            theme.scoreCardContainerClasses
                        )}
                    >
                        {isLoadingScores ? (
                            <div className="opacity-85 flex flex-row items-center justify-center space-x-2">
                                <Spinner className="h-6 w-6 text-white" />
                                <p className="text-white">Loading scores...</p>
                            </div>
                        ) : scores.length > 0 ? (
                            scores.map((score, scoreIdx) => (
                                <Fragment key={`${score.user.usersId}`}>
                                    {scoreDividerIdx !== null && scoreDividerIdx === scoreIdx && (
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
                            ))
                        ) : (
                            <div className="opacity-85 opacity-85 flex flex-row items-center justify-center space-x-2 text-white">
                                This leaderboard has no scores, yet!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

LeaderboardPage.propTypes = {};

export default LeaderboardPage;
