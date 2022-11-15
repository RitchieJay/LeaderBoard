import { TrophyIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

const Logo = ({ color = "brand", size = "base", withText = false, className, ...rest }) => (
    <div
        className={classNames(
            "flex flex-row items-center justify-start",
            {
                // Size
                "space-x-2": size === "base",

                // Colors
                "text-brand-600": color === "brand",
                "text-white": color === "white",
            },
            className
        )}
        {...rest}
    >
        <TrophyIcon
            className={classNames(
                "flex-shrink-0",
                {
                    // Size
                    "h-6 w-6": size === "base",
                },
                className
            )}
        />
        {withText && <span className="text-sm font-bold">Leaderboard</span>}
    </div>
);

Logo.propTypes = {
    color: PropTypes.oneOf(["brand", "white"]),
    size: PropTypes.oneOf(["base"]),
    withText: PropTypes.bool,
    className: PropTypes.string,
};

export default Logo;
