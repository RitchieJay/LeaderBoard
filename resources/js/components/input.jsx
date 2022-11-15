import classNames from "classnames";
import PropTypes from "prop-types";

const Input = ({ className, ...rest }) => (
    <input
        {...rest}
        className={classNames(
            "block w-full rounded-md border-gray-300 px-4 py-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
            className
        )}
    />
);

Input.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Input;
