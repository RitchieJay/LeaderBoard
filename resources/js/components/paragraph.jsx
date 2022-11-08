import classNames from "classnames";
import PropTypes from "prop-types";

const P = ({ color = "default", children, className, ...rest }) => (
    <p
        {...rest}
        className={classNames(
            "text-base font-normal leading-normal",
            {
                // Colors
                "text-gray-900": color === "default",
                "text-gray-500": color === "muted",
                "text-white": color === "white",
            },
            className
        )}
    >
        {children}
    </p>
);

P.propTypes = {
    color: PropTypes.oneOf(["default", "muted"]),
    children: PropTypes.node,
    className: PropTypes.string,
};

export default P;
