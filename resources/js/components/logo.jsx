import { TrophyIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

const Logo = ({ color = "brand", size = "base", className, ...rest }) => (
    <TrophyIcon
        className={classNames(
            {
                // Colors
                "text-brand-600": color === "brand",
                "text-white": color === "white",

                // Size
                "h-6 w-6": size === "base",
                "h-12 w-12": size === "lg",
            },
            className
        )}
        {...rest}
    />
);

Logo.propTypes = {
    color: PropTypes.oneOf(["brand", "white"]),
    size: PropTypes.oneOf(["base", "lg"]),
    className: PropTypes.string,
};

export default Logo;
