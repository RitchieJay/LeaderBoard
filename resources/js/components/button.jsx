import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ as: Tag = Link, color = "default", children, className, ...rest }) => (
    <Tag
        {...rest}
        className={classNames(
            "inline-flex items-center rounded-md border px-5 py-2.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            {
                // Colors
                "border-gray-300 bg-white text-gray-700 hover:bg-gray-50": color === "default",
                "border-transparent bg-indigo-600 text-white hover:bg-indigo-700": color === "brand",
            },
            className
        )}
    >
        {children}
    </Tag>
);

Button.propTypes = {
    as: PropTypes.elementType,
    color: PropTypes.oneOf(["default", "brand"]),
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Button;
