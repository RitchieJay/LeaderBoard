import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ as: Tag = Link, color = "default", size = "base", children, className, ...rest }) => (
    <Tag
        {...rest}
        className={classNames(
            "inline-flex items-center rounded-md border font-medium shadow-sm focus:outline-none",
            {
                // Colors
                "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":
                    color === "default",
                "border-transparent bg-brand-600 text-white hover:bg-brand-700 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2":
                    color === "brand",
                "border-transparent bg-white text-brand-600 hover:bg-brand-50": color === "white",

                // Sizes
                "px-5 py-2.5 text-sm": size === "base",
                "px-6 py-3 text-base": size === "lg",
            },
            className
        )}
    >
        {children}
    </Tag>
);

Button.propTypes = {
    as: PropTypes.elementType,
    color: PropTypes.oneOf(["default", "brand", "white"]),
    size: PropTypes.oneOf(["base", "lg"]),
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Button;
