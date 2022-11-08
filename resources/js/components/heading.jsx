import classNames from "classnames";
import PropTypes from "prop-types";

const Heading = ({ as, level, color = "default", children, className, ...rest }) => {
    const Tag = as || `h${level}`;
    return (
        <Tag
            {...rest}
            className={classNames(
                "font-bold leading-snug tracking-tight",
                {
                    // Colors
                    "text-gray-900": color === "default",
                    "text-brand-600": color === "brand",

                    // Levels
                    "text-4xl sm:text-5xl": level === 1,
                    "text-lg": level === 2,
                },
                className
            )}
        >
            {children}
        </Tag>
    );
};

Heading.propTypes = {
    as: PropTypes.elementType,
    level: PropTypes.oneOf([1, 2]).isRequired,
    color: PropTypes.oneOf(["default", "brand"]),
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Heading;
