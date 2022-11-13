import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

const Spinner = ({ className, ...rest }) => (
    <Cog6ToothIcon className={classNames("animate-spin-slow", className)} {...rest} />
);

Spinner.propTypes = {
    className: PropTypes.string,
};

export default Spinner;
