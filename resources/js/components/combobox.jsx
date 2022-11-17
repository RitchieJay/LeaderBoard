import { Combobox as BaseCombobox } from "@headlessui/react";
import { ChevronUpDownIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import Label from "./label";

const Combobox = forwardRef(
    (
        {
            className,
            id,
            value,
            getDisplayValue,
            options,
            getOption,
            onQueryChange,
            onChange,
            withLabel,
            withHelper,
            hasErrors = false,
            ...rest
        },
        ref
    ) => (
        <BaseCombobox {...rest} as="div" value={value} onChange={onChange}>
            {withLabel && (
                <BaseCombobox.Label as={Label} htmlFor={id} className="mb-2">
                    {withLabel}
                </BaseCombobox.Label>
            )}
            <div className="relative shadow-sm">
                <BaseCombobox.Input
                    className={classNames(
                        "block w-full rounded-md border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-1",
                        {
                            // Errors
                            "border-gray-300 text-gray-800 placeholder-gray-400 focus:border-brand-500 focus:ring-brand-500":
                                !hasErrors,
                            "border-red-300 text-red-700 placeholder-red-400 focus:border-red-500 focus:ring-red-500":
                                hasErrors,
                        }
                    )}
                    autoComplete="off"
                    onChange={(e) => onQueryChange(e.target.value)}
                    displayValue={getDisplayValue}
                    aria-invalid={hasErrors ? "true" : undefined}
                />
                <BaseCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 focus:outline-none">
                    {hasErrors ? (
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    ) : (
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    )}
                </BaseCombobox.Button>

                {options.length > 0 && (
                    <BaseCombobox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-2 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {options.map((o) => {
                            const option = getOption(o);
                            return (
                                <BaseCombobox.Option
                                    key={option.key}
                                    value={o}
                                    className={({ active }) =>
                                        classNames(
                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                            active ? "bg-brand-600 text-white" : "text-gray-900"
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <div className="flex">
                                            <span className={classNames("truncate", selected && "font-bold")}>
                                                {option.primaryLabel}
                                            </span>
                                            {option.secondaryLabel && (
                                                <span
                                                    className={classNames(
                                                        "ml-2 truncate text-gray-500",
                                                        active ? "text-brand-200" : "text-gray-500"
                                                    )}
                                                >
                                                    {option.secondaryLabel}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </BaseCombobox.Option>
                            );
                        })}
                    </BaseCombobox.Options>
                )}
            </div>
            {withHelper && (
                <p className={classNames("mt-2 text-xs", hasErrors ? "text-red-500" : "text-gray-500")}>{withHelper}</p>
            )}
        </BaseCombobox>
    )
);

Combobox.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.any,
    getDisplayValue: PropTypes.func.isRequired,
    getOption: PropTypes.func.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    withLabel: PropTypes.node,
    withHelper: PropTypes.node,
    hasErrors: PropTypes.bool,
};

export default Combobox;
