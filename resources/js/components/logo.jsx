import { BoltIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

const Logo = ({ color = "white", className, ...rest }) => (
    <div
        {...rest}
        className={classNames(
            "flex flex-row items-center justify-start space-x-1 text-sm uppercase",
            {
                // Color
                "text-white": color === "white",
            },
            className
        )}
    >
        <span className="-mr-[0.125em] font-normal tracking-[0.25em] opacity-80">Rank</span>
        <BoltIcon className="h-5 w-5" />
        <span className="font-bold tracking-[0.25em]">Up</span>
    </div>
);

Logo.propTypes = {
    color: PropTypes.oneOf(["white"]),
    className: PropTypes.string,
};

export default Logo;
