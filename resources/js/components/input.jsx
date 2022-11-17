import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import Label from "./label";

const Input = forwardRef(
    ({ id, value, onChange, withLabel, withHelper, hasErrors = false, className, ...rest }, ref) => (
        <>
            {withLabel && (
                <Label htmlFor={id} className="mb-2">
                    {withLabel}
                </Label>
            )}
            <div className="relative rounded-md shadow-sm">
                <input
                    {...rest}
                    ref={ref}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={classNames(
                        "block w-full rounded-md border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-1",
                        {
                            // Errors
                            "border-gray-300 text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-brand-500":
                                !hasErrors,
                            "border-red-300 text-red-700 placeholder-red-400 focus:border-red-500 focus:ring-red-500":
                                hasErrors,
                        },
                        className
                    )}
                    aria-invalid={hasErrors ? "true" : undefined}
                />
                {hasErrors && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                )}
            </div>
            {withHelper && (
                <p className={classNames("mt-2 text-xs", hasErrors ? "text-red-500" : "text-gray-500")}>{withHelper}</p>
            )}
        </>
    )
);

Input.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.node,
    withHelper: PropTypes.node,
    hasErrors: PropTypes.bool,
    className: PropTypes.string,
};

export default Input;
