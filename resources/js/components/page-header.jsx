import classNames from "classnames";
import PropTypes from "prop-types";
import { useNavigationContext } from "../contexts/navigation";
import Heading from "./heading";

const PageHeader = ({ className, ...rest }) => {
    const { pageTitle } = useNavigationContext();

    return (
        <header className={classNames("bg-white shadow-sm", className)} {...rest}>
            <div className="mx-auto flex h-14 max-w-7xl items-center px-4 sm:h-16 sm:px-6 lg:px-8">
                {pageTitle && (
                    <Heading as="h1" level={2}>
                        {pageTitle}
                    </Heading>
                )}
            </div>
        </header>
    );
};

PageHeader.propTypes = {
    className: PropTypes.string,
};

export default PageHeader;
