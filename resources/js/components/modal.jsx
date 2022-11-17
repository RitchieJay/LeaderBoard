import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Fragment } from "react";

const Modal = ({ isOpen, onClose, children, onCloseFinish }) => (
    <Transition.Root afterLeave={onCloseFinish} show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                        <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl transition-all sm:max-w-xl sm:px-10 sm:py-8 lg:max-w-2xl lg:px-12 lg:py-10">
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
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    onCloseFinish: PropTypes.func,
};

export const ModalTitle = ({ className, children, ...rest }) => (
    <Dialog.Title
        {...rest}
        as="h3"
        className={classNames(
            "mb-6 border-b border-gray-300 pb-2 text-xl font-bold text-gray-900 sm:pb-4 sm:text-2xl",
            className
        )}
    >
        {children}
    </Dialog.Title>
);

ModalTitle.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Modal;
