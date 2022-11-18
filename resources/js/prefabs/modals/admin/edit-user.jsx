import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchPeople } from "../../../api/search";
import {
    useArchiveUserByDisplayName,
    useCreateUser,
    useUpdateUserByDisplayName,
} from "../../../api/users";
import Button from "../../../components/button";
import Combobox from "../../../components/combobox";
import Input from "../../../components/input";
import Modal, { ModalTitle } from "../../../components/modal";
import Toggle from "../../../components/toggle";

const AdminEditUserModal = ({ user, isOpen, onClose, ...rest }) => {
    const [personQuery, setPersonQuery] = useState(user?.person?.username ?? "");

    // Fetch data
    const { data: people = [] } = useSearchPeople(personQuery);

    // Data mutations
    const {
        mutate: createUser,
        isLoading: isCreatingUser,
        isSuccess: didCreateUser,
    } = useCreateUser();
    const {
        mutate: updateUser,
        isLoading: isUpdatingUser,
        isSuccess: didUpdateUser,
    } = useUpdateUserByDisplayName();
    const {
        mutate: archiveUser,
        isLoading: isArchivingUser,
        isSuccess: didArchiveUser,
    } = useArchiveUserByDisplayName();

    // Determine whether actions are being performed
    const isPerformingAction = useMemo(() => {
        return isCreatingUser || isUpdatingUser || isArchivingUser;
    }, [isCreatingUser, isUpdatingUser, isArchivingUser]);
    const didCompleteAction = useMemo(() => {
        return didCreateUser || didUpdateUser || didArchiveUser;
    }, [didCreateUser, didUpdateUser, didArchiveUser]);

    // Configure the form
    const {
        register: formRegister,
        reset: formReset,
        control: formControl,
        formState: { errors },
        handleSubmit: formHandleSubmit,
    } = useForm({
        defaultValues: {
            displayName: user?.displayName ?? "",
            isAdmin: user?.isAdmin ?? false,
            person: user?.person ?? null,
        },
    });

    // Handle person query changes
    const handlePersonQueryChange = (newPersonQuery) => {
        setPersonQuery(newPersonQuery);
    };
    const debouncedHandlePersonQueryChange = useMemo(() => {
        return debounce(handlePersonQueryChange, 300);
    }, []);

    // Handle form reset
    const handleResetForm = useCallback(() => {
        formReset();
        handlePersonQueryChange(user?.person?.username ? user.person.username : "");
    }, [user, formReset]);

    // Handle form submission
    const handleSubmitForm = useCallback(
        (data) => {
            const payload = {
                displayName: data.displayName,
                personCode: data.person.personCode,
                isAdmin: data.isAdmin,
            };

            // Create / update users
            if (user) {
                updateUser({
                    ...payload,
                    existingDisplayName: user.displayName,
                });
            } else {
                createUser(payload);
            }
        },
        [user, createUser, updateUser]
    );

    // When actions succeed, close the modal
    useEffect(() => {
        if (didCompleteAction && isOpen) {
            onClose();
        }
    }, [didCompleteAction, isOpen, onClose]);

    return (
        <Modal {...rest} isOpen={isOpen} onClose={onClose}>
            <ModalTitle>{user ? "Edit" : "Create"} User</ModalTitle>
            <form
                className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
                onSubmit={formHandleSubmit(handleSubmitForm)}
            >
                <div>
                    <Input
                        type="text"
                        id="edit-user-display-name"
                        withLabel="Display Name"
                        hasErrors={!!errors.displayName}
                        withHelper={
                            errors.displayName
                                ? "Enter a valid display name"
                                : "Can only contain letters, numbers, and underscores"
                        }
                        placeholder="E.g. jamesbond_007"
                        disabled={isPerformingAction || didCompleteAction}
                        {...formRegister("displayName", {
                            required: true,
                            maxLength: 100,
                            pattern: /^[A-Za-z0-9_]+$/g,
                        })}
                    />
                </div>
                <div>
                    <Controller
                        name="person"
                        control={formControl}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Combobox
                                id="edit-user-person"
                                withLabel="Linked Person"
                                hasErrors={!!errors.person}
                                withHelper={errors.person ? "Select a person" : undefined}
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
                                onQueryChange={debouncedHandlePersonQueryChange}
                                disabled={isPerformingAction || didCompleteAction}
                                {...field}
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        name="isAdmin"
                        control={formControl}
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
                        {user && user.displayName && (
                            <>
                                {user.isActive ? (
                                    <Button
                                        as="button"
                                        type="button"
                                        color="red"
                                        disabled={isPerformingAction || didCompleteAction}
                                        onClick={() => archiveUser(user.displayName)}
                                    >
                                        Archive<span className="hidden sm:inline">&nbsp;User</span>
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
                                        Enable<span className="hidden sm:inline">&nbsp;User</span>
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
                            onClick={() => handleResetForm()}
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
        </Modal>
    );
};

AdminEditUserModal.propTypes = {
    displayName: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminEditUserModal;
