import PropTypes from "prop-types";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import Button from "../../../components/button";
import Combobox from "../../../components/combobox";
import Input from "../../../components/input";
import Modal, { ModalTitle } from "../../../components/modal";
import PageLoader from "../../../components/page-loader";
import Toggle from "../../../components/toggle";
import useForm from "../../forms/admin/edit-user";

const AdminEditUserModal = ({ user, isOpen, onClose, ...rest }) => {
    // Configure the form
    const {
        register,
        control,
        resetForm,
        handleFormSubmit,
        people,
        isLoadingPeople,
        setPersonQueryDebounced,
        updateUser,
        archiveUser,
        isPerformingAction,
        didCompleteAction,
        errors,
    } = useForm(user);

    // When actions succeed, close the modal
    useEffect(() => {
        if (didCompleteAction && isOpen) {
            onClose();
        }
    }, [didCompleteAction, isOpen, onClose]);

    return (
        <Modal {...rest} isOpen={isOpen} onClose={onClose}>
            <ModalTitle>{user ? "Edit" : "Create"} User</ModalTitle>
            {isLoadingPeople && user ? (
                <PageLoader />
            ) : (
                <form
                    className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
                    onSubmit={handleFormSubmit}
                >
                    <div>
                        <Input
                            type="text"
                            id="edit-user-display-name"
                            withLabel="Display Name"
                            hasErrors={!!errors.displayName}
                            withHelper={
                                errors.displayName ||
                                "Display name can only contain letters, numbers, and underscores"
                            }
                            placeholder="E.g. jamesbond_007"
                            disabled={isPerformingAction || didCompleteAction}
                            {...register("displayName", {
                                required: true,
                                maxLength: 100,
                                pattern: /^[A-Za-z0-9_]+$/g,
                            })}
                        />
                    </div>
                    <div>
                        <Controller
                            name="person"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Combobox
                                    id="edit-user-person"
                                    withLabel="Linked Person"
                                    hasErrors={!!errors.person}
                                    withHelper={errors.person}
                                    options={people}
                                    getDisplayValue={(val) =>
                                        val ? `${val.forename} ${val.surname}` : ""
                                    }
                                    getOption={(option) => ({
                                        key: `${option.personCode}`,
                                        value: `${option.personCode}`,
                                        primaryLabel: `${option.forename} ${option.surname}`,
                                        secondaryLabel: `${option.id}`,
                                    })}
                                    onQueryChange={setPersonQueryDebounced}
                                    disabled={isPerformingAction || didCompleteAction}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            name="isAdmin"
                            control={control}
                            render={({ field }) => (
                                <Toggle
                                    id="edit-user-is-admin"
                                    withLabel="Is Admin"
                                    checked={field.value}
                                    withHelper="Allows the user to manage users and leaderboards"
                                    disabled={isPerformingAction || didCompleteAction}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-between space-x-3 border-t border-gray-300 pt-4">
                        <div>
                            {user && (
                                <>
                                    {user.isActive ? (
                                        <Button
                                            as="button"
                                            type="button"
                                            color="red"
                                            disabled={isPerformingAction || didCompleteAction}
                                            onClick={() => archiveUser(user.displayName)}
                                        >
                                            Archive
                                            <span className="hidden sm:inline">&nbsp;User</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            as="button"
                                            type="button"
                                            color="default"
                                            disabled={isPerformingAction || didCompleteAction}
                                            onClick={() =>
                                                updateUser({
                                                    existingDisplayName: user.displayName,
                                                    displayName: user.displayName,
                                                    personCode: user.person.personCode,
                                                    isAdmin: user.isAdmin,
                                                })
                                            }
                                        >
                                            Enable
                                            <span className="hidden sm:inline">&nbsp;User</span>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="space-x-3">
                            <Button
                                as="button"
                                type="button"
                                color="default"
                                className="hidden sm:inline-block"
                                disabled={isPerformingAction || didCompleteAction}
                                onClick={() => resetForm()}
                            >
                                Reset
                            </Button>
                            <Button
                                as="button"
                                type="submit"
                                color="brand"
                                disabled={isPerformingAction || didCompleteAction}
                            >
                                {user ? "Save" : "Create"}
                                <span className="hidden sm:inline">&nbsp;User</span>
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </Modal>
    );
};

AdminEditUserModal.propTypes = {
    user: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminEditUserModal;
