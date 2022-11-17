import classNames from "classnames";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ as: Tag = RouterLink, children, className, ...rest }) => (
    <Tag
        {...rest}
        className={classNames(
            "cursor-pointer rounded font-bold text-brand-700 outline-none hover:underline focus:underline active:text-brand-900",
            className
        )}
    >
        {children}
    </Tag>
);

Link.propTypes = {
    as: PropTypes.elementType,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Link;
