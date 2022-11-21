import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Fragment } from "react";
import Heading from "./heading";

const Modal = ({
    isOpen,
    isWide = false,
    onClose,
    onCloseFinish,
    children,
    className,
    ...rest
}) => (
    <Transition.Root afterLeave={onCloseFinish} show={isOpen} as={Fragment}>
        <Dialog
            {...rest}
            as="div"
            className={classNames("relative z-10", className)}
            onClose={onClose}
        >
            {/* Underlay */}
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* Modal */}
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-5 text-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className={classNames(
                                "relative w-full transform overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all sm:max-w-xl sm:px-10 sm:py-8",
                                {
                                    "md:max-w-2xl lg:max-w-4xl lg:px-12 lg:py-10 xl:max-w-5xl":
                                        isWide,
                                    "lg:max-w-2xl lg:px-12 lg:py-10": !isWide,
                                }
                            )}
                        >
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
);

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isWide: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onCloseFinish: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
};

export const ModalTitle = ({ className, children, ...rest }) => (
    <Dialog.Title
        {...rest}
        as={Heading}
        level={2}
        className={classNames("mb-6 border-b border-gray-300 pb-2 sm:pb-4", className)}
    >
        {children}
    </Dialog.Title>
);

ModalTitle.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Modal;
