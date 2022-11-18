import { useCallback, useMemo, useState } from "react";
import { useForm as useBaseForm } from "react-hook-form";
import { useSearchPeople } from "../../../api/search";
import {
    useArchiveUserByDisplayName,
    useCreateUser,
    useUpdateUserByDisplayName,
} from "../../../api/users";
import { useDebounce } from "../../../utils/timing";

const LINKED_PERSON_DEBOUNCE_DELAY_MS = 300;

const useForm = (user) => {
    // Configure the form
    const {
        register,
        reset,
        control,
        formState: { errors },
        handleSubmit,
    } = useBaseForm({
        defaultValues: {
            displayName: user?.displayName ?? "",
            isAdmin: user?.isAdmin ?? false,
            person: user?.person ?? null,
        },
    });

    // Linked person
    const [personQuery, setPersonQuery] = useState(user?.person?.username ?? "");
    const { data: people = [] } = useSearchPeople(personQuery);
    const setPersonQueryDebounced = useDebounce((newPersonQuery) => {
        setPersonQuery(newPersonQuery);
    }, LINKED_PERSON_DEBOUNCE_DELAY_MS);

    // Mutations
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

    // Action management
    const isPerformingAction = useMemo(() => {
        return isCreatingUser || isUpdatingUser || isArchivingUser;
    }, [isCreatingUser, isUpdatingUser, isArchivingUser]);
    const didCompleteAction = useMemo(() => {
        return didCreateUser || didUpdateUser || didArchiveUser;
    }, [didCreateUser, didUpdateUser, didArchiveUser]);

    // Form errors
    const displayNameError = useMemo(() => {
        switch (errors?.displayName?.type) {
            case "required":
                return "Display name is required";
            case "maxLength":
                return "Display name is too long";
            case "pattern":
                return "Display name can only contain letters, numbers, and underscores";
            default:
                return null;
        }
    }, [errors?.displayName?.type]);
    const personError = useMemo(() => {
        switch (errors?.person?.type) {
            case "required":
                return "Linked person is required";
            default:
                return null;
        }
    }, [errors?.person?.type]);

    // Form reset
    const resetForm = useCallback(() => {
        reset();
        setPersonQuery(user?.person?.username ?? "");
    }, [user, setPersonQuery, reset]);

    // Form submission
    const handleFormSubmit = useCallback(
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

    return {
        // Form
        register,
        control,
        resetForm,
        handleFormSubmit: handleSubmit(handleFormSubmit),

        // Linked person
        setPersonQuery,
        people,
        setPersonQueryDebounced,

        // Mutation
        createUser,
        updateUser,
        archiveUser,

        // Action management
        isPerformingAction,
        didCompleteAction,

        // Errors
        errors: {
            displayName: displayNameError,
            person: personError,
        },
    };
};

export default useForm;
