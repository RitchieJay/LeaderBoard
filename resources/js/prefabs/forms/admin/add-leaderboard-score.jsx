import { useCallback, useMemo, useRef, useState } from "react";
import { useForm as useBaseForm } from "react-hook-form";
import { useUpdateLeaderboardScoreForUser } from "../../../api/leaderboards";
import { useGetUsers } from "../../../api/users";

const useForm = (leaderboard) => {
    // Configure the form
    const {
        register,
        reset,
        control,
        formState: { errors },
        handleSubmit,
    } = useBaseForm({
        defaultValues: {
            user: null,
            score: "",
        },
    });

    // Mutations
    const {
        mutate: updateScore,
        isLoading: isUpdatingScore,
        isSuccess: didUpdateScore,
    } = useUpdateLeaderboardScoreForUser(leaderboard?.urlName);

    // User
    const userInputRef = useRef(null);
    const [userQuery, setUserQuery] = useState("");
    const { data: users = [], isLoading: isLoadingUsers } = useGetUsers(false);

    // Filter users based on search input
    const filteredUsers = useMemo(() => {
        const userQueryParts = userQuery.toLowerCase().trim().split(" ");
        return users.filter((u) => {
            const userFields = [
                u.person.forename.toLowerCase(),
                u.person.surname.toLowerCase(),
                u.displayName.toLowerCase(),
                u.person.username.toLowerCase(),
            ];
            for (let q of userQueryParts) {
                let matched = false;
                for (let uf of userFields) {
                    if (uf.includes(q)) {
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    return false;
                }
            }
            return true;
        });
    }, [userQuery, users]);

    // Form errors
    const userError = useMemo(() => {
        switch (errors?.user?.type) {
            case "required":
                return "User is required";
            default:
                return null;
        }
    }, [errors?.user?.type]);
    const scoreError = useMemo(() => {
        switch (errors?.score?.type) {
            case "required":
                return "Score is required";
            case "maxLength":
                return "Score is too long";
            default:
                return null;
        }
    }, [errors?.score?.type]);

    // Form reset
    const resetForm = useCallback(() => {
        reset();
        setUserQuery("");
        userInputRef.current.focus();
    }, [reset, userInputRef]);

    // Form submission
    const handleFormSubmit = useCallback(
        (data) => {
            const payload = {
                userDisplayName: data.user.displayName,
                score: data.score,
            };

            // Create/edit scores
            updateScore(payload);
        },
        [updateScore]
    );

    return {
        // Form
        register,
        control,
        resetForm,
        handleFormSubmit: handleSubmit(handleFormSubmit),

        // User
        userInputRef,
        userQuery,
        setUserQuery,
        isLoadingUsers,
        filteredUsers,

        // Action management
        isUpdatingScore,
        didUpdateScore,

        // Errors
        errors: {
            user: userError,
            score: scoreError,
        },
    };
};

export default useForm;
