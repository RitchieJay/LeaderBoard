import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

const Spinner = ({ className, ...rest }) => (
    <Cog6ToothIcon className={classNames("inline-block animate-spin-slow", className)} {...rest} />
);

Spinner.propTypes = {
    className: PropTypes.string,
};

export default Spinner;
