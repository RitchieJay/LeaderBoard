import classNames from "classnames";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

const Link = ({ children, className, ...rest }) => (
    <RouterLink
        {...rest}
        className={classNames(
            "rounded font-bold text-brand-700 outline-none hover:underline focus:underline active:text-brand-900",
            className
        )}
    >
        {children}
    </RouterLink>
);

Link.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Link;
