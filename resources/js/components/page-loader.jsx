import classNames from "classnames";
import PropTypes from "prop-types";
import Spinner from "./spinner";

const PageLoader = ({ className, ...rest }) => (
    <div {...rest} className={classNames("flex flex-row items-center justify-center space-x-2", className)}>
        <Spinner className="h-5 w-5 text-gray-600" />
        <p className="text-gray-600">Loading...</p>
    </div>
);

PageLoader.propTypes = {
    className: PropTypes.string,
};

export default PageLoader;
