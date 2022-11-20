import { TrophyIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

const UserScoreCard = ({ rankPrefix = "#", theme, rank, user, score, className }) => (
    <div
        key={`${rank}`}
        className={classNames(
            "relative flex w-full flex-row items-center justify-between space-x-4 overflow-hidden rounded-xl",
            theme.containerClasses,
            className
        )}
    >
        <span className={classNames("inline-block", theme.rankClasses)}>
            {rankPrefix}
            {rank}
        </span>
        <p className={classNames("flex-1 truncate", theme.displayNameClasses)}>
            {user.displayName}
        </p>
        <div className="flex flex-row items-center justify-start space-x-2">
            {rank === 1 && <TrophyIcon className={theme.trophyClasses} />}
            <span className={classNames("inline-block", theme.scoreClasses)}>{score}</span>
        </div>
    </div>
);

UserScoreCard.propTypes = {
    rankPrefix: PropTypes.string,
    theme: PropTypes.object.isRequired,
    rank: PropTypes.number.isRequired,
    user: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.string.isRequired,
};
export default UserScoreCard;
