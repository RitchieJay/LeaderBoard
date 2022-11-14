import classNames from "classnames";
import PropTypes from "prop-types";

const Badge = ({ color = "default", children, className, ...rest }) => (
    <span
        {...rest}
        className={classNames(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            {
                // Color
                "bg-gray-100 text-gray-800": color === "default",
                "bg-brand-100 text-brand-800": color === "brand",
            },
            className
        )}
    >
        {children}
    </span>
);

Badge.propTypes = {
    color: PropTypes.oneOf(["default", "brand"]),
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Badge;
