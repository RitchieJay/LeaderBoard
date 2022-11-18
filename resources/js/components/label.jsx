import classNames from "classnames";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Label = forwardRef(({ children, className, ...rest }, ref) => (
    <label
        {...rest}
        ref={ref}
        className={classNames("block text-sm font-bold text-gray-700", className)}
    >
        {children}
    </label>
));

Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Label;
