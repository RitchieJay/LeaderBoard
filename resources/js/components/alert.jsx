import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";

const Alert = ({
    color = "red",
    icon: Icon = ExclamationTriangleIcon,
    children,
    className,
    ...rest
}) => (
    <div
        {...rest}
        className={classNames(
            "border-l-4 p-4",
            {
                // Colors
                "border-red-400 bg-red-50": color === "red",
            },
            className
        )}
    >
        <div className="flex">
            <div className="flex-shrink-0">
                <Icon
                    className={classNames("h-5 w-5", {
                        // Colors
                        "text-red-400": color === "red",
                    })}
                    aria-hidden="true"
                />
            </div>
            <div className="ml-3">
                <p
                    className={classNames("text-sm", {
                        // Colors
                        "text-red-700": color === "red",
                    })}
                >
                    {children}
                </p>
            </div>
        </div>
    </div>
);

Alert.propTypes = {
    color: PropTypes.oneOf(["red"]),
    icon: PropTypes.elementType,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Alert;
