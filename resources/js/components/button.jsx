import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
    as: Tag = Link,
    color = "default",
    size = "base",
    disabled = false,
    children,
    className,
    ...rest
}) => (
    <Tag
        {...rest}
        disabled={disabled}
        className={classNames(
            "inline-flex shrink-0 items-center justify-center rounded-md border font-medium shadow-sm focus:outline-none",
            {
                // Colors
                "border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-offset-2":
                    color === "default",
                "hover:bg-gray-50 focus:ring-brand-500": color === "default" && !disabled,

                "border-transparent bg-brand-600 text-white focus:ring-2 focus:ring-offset-2":
                    color === "brand",
                "hover:bg-brand-700 focus:ring-brand-500": color === "brand" && !disabled,

                "border-transparent bg-red-600 text-white focus:ring-2 focus:ring-offset-2":
                    color === "red",
                "hover:bg-red-700 focus:ring-red-500": color === "red" && !disabled,

                "border-transparent bg-white text-brand-600": color === "white",
                "hover:bg-brand-50": color === "white" && !disabled,

                // Sizes
                "px-2 py-1 text-xs": size === "sm",
                "px-5 py-2.5 text-sm": size === "base",
                "px-6 py-3 text-base": size === "lg",

                // Disabled
                "cursor-default opacity-60": !!disabled,
            },
            className
        )}
    >
        {children}
    </Tag>
);

Button.propTypes = {
    as: PropTypes.elementType,
    color: PropTypes.oneOf(["default", "brand", "red", "white"]),
    size: PropTypes.oneOf(["sm", "base", "lg"]),
    disabled: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Button;
