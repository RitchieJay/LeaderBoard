import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchPeople } from "../../../api/search";
import {
    useArchiveUserByDisplayName,
    useCreateUser,
    useGetUserByDisplayName,
    useUpdateUserByDisplayName,
} from "../../../api/users";
import Button from "../../../components/button";
import Combobox from "../../../components/combobox";
import Input from "../../../components/input";
import Modal, { ModalTitle } from "../../../components/modal";
import PageLoader from "../../../components/page-loader";
import Toggle from "../../../components/toggle";

const resetFormDefaultValues = (user) => ({
    displayName: user?.displayName || "",
    isAdmin: user?.isAdmin || false,
    person: user?.person || null,
});

const AdminEditUserModal = ({ displayName, onClose, onCloseFinish, ...rest }) => {
    const [formDefaultValues, setFormDefaultValues] = useState(resetFormDefaultValues);
    const [personQuery, setPersonQuery] = useState("");
    const [isPerformingAction, setIsPerformingAction] = useState(false);

    // Fetch data
    const { data: user = null } = useGetUserByDisplayName(displayName);
    const { data: people = [], isFetching: isLoadingPeople } = useSearchPeople(personQuery);

    // Data mutations
    const { mutate: createUser } = useCreateUser({
        onSuccess: () => {
            onClose();
        },
        onSettled: () => {
            setIsPerformingAction(false);
        },
    });
    const { mutate: updateUser } = useUpdateUserByDisplayName({
        onSuccess: () => {
            onClose();
        },
        onSettled: () => {
            setIsPerformingAction(false);
        },
    });
    const { mutate: archiveUser } = useArchiveUserByDisplayName({
        onSuccess: () => {
            onClose();
        },
        onSettled: () => {
            setIsPerformingAction(false);
        },
    });

    // Configure the form
    const {
        register: formRegister,
        reset: formReset,
        control: formControl,
        formState: { errors },
        handleSubmit: formHandleSubmit,
    } = useForm({
        defaultValues: formDefaultValues,
    });

    const handlePersonQueryChange = (newPersonQuery) => {
        setPersonQuery(newPersonQuery);
    };
    const debouncedHandlePersonQueryChange = useMemo(() => {
        return debounce(handlePersonQueryChange, 300);
    }, []);

    const handleResetForm = useCallback(() => {
        const newFormDefaultValues = resetFormDefaultValues(user);
        setFormDefaultValues(newFormDefaultValues);
        formReset(newFormDefaultValues);

        // Update the person picker query to pre-filter
        if (user) {
            handlePersonQueryChange(`${user?.person?.forename} ${user?.person?.surname} ${user?.person?.username}`);
        } else {
            handlePersonQueryChange("");
        }
    }, [user, formReset]);

    const handleCreateUser = useCallback(
        async (data) => {
            setIsPerformingAction(true);
            await createUser({
                displayName: data.displayName,
                personCode: data.person.personCode,
                isAdmin: data.isAdmin,
            });
        },
        [createUser]
    );

    const handleUpdateUser = useCallback(
        async (data) => {
            setIsPerformingAction(true);
            await updateUser({
                existingDisplayName: user.displayName,
                displayName: data.displayName,
                personCode: data.person.personCode,
                isAdmin: data.isAdmin,
            });
        },
        [user, updateUser]
    );

    const handleArchiveUser = useCallback(
        async (userDisplayName) => {
            setIsPerformingAction(true);
            await archiveUser(userDisplayName);
        },
        [archiveUser]
    );

    const handleEnableUser = useCallback(
        async (userToEnable) => {
            handleUpdateUser(userToEnable);
        },
        [handleUpdateUser]
    );

    const handleSubmitForm = useCallback(
        async (data) => {
            // Update existing users
            if (user) {
                handleUpdateUser(data);
            }
            // Create new users
            else {
                handleCreateUser(data);
            }
        },
        [user, handleCreateUser, handleUpdateUser]
    );

    // On modal close, reset the form
    const handleModalCloseFinish = useCallback(() => {
        handleResetForm();
        onCloseFinish();
    }, [handleResetForm, onCloseFinish]);

    // Reset the form whenever the user changes
    useEffect(() => {
        handleResetForm();
    }, [handleResetForm]);

    return (
        <Modal onClose={onClose} onCloseFinish={handleModalCloseFinish} {...rest}>
            <ModalTitle>{displayName ? "Edit" : "Create"} User</ModalTitle>
            {(displayName && !user) || (user && isLoadingPeople && people.length < 1) ? (
                <PageLoader />
            ) : (
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
                                    getDisplayValue={(val) => (val ? `${val.forename} ${val.surname}` : "")}
                                    getOption={(option) => ({
                                        key: `${option.personCode}`,
                                        value: `${option.personCode}`,
                                        primaryLabel: `${option.forename} ${option.surname}`,
                                        secondaryLabel: `${option.id}`,
                                    })}
                                    onQueryChange={debouncedHandlePersonQueryChange}
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
                                            disabled={isPerformingAction}
                                            onClick={() => handleArchiveUser(user?.displayName)}
                                        >
                                            Archive<span className="hidden sm:inline">&nbsp;User</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            as="button"
                                            type="button"
                                            color="default"
                                            disabled={isPerformingAction}
                                            onClick={() => handleEnableUser(user)}
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
                                disabled={isPerformingAction}
                                onClick={() => handleResetForm()}
                            >
                                Reset
                            </Button>
                            <Button as="button" type="submit" color="brand" disabled={isPerformingAction}>
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
    displayName: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default AdminEditUserModal;
