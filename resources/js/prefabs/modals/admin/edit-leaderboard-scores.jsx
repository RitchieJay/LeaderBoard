import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    useGetScoresForLeaderboard,
    useUpdateLeaderboardScoreForUser,
} from "../../../api/leaderboards";
import { useGetUsers } from "../../../api/users";
import Button from "../../../components/button";
import Combobox from "../../../components/combobox";
import Heading from "../../../components/heading";
import Input from "../../../components/input";
import Modal, { ModalTitle } from "../../../components/modal";
import PageLoader from "../../../components/page-loader";
import Table from "../../../components/table";
import { columns as leaderboardScoresTableColumns } from "../../../prefabs/tables/admin/leaderboard-scores";

const AdminEditLeaderboardScoresModal = ({ leaderboard, isOpen, onClose, ...rest }) => {
    // Configure the form
    const {
        register,
        reset,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            user: null,
            score: "",
        },
    });

    // Refs
    const userInputRef = useRef(null);

    // State
    const [userQuery, setUserQuery] = useState("");

    // Data
    const { data: scores = [], isLoading: isLoadingScores } = useGetScoresForLeaderboard(
        leaderboard.urlName
    );
    const { data: users = [], isLoading: isLoadingUsers } = useGetUsers(false);

    // Mutations
    const {
        mutate: updateScore,
        isLoading: isUpdatingScore,
        isSuccess: didUpdateScore,
    } = useUpdateLeaderboardScoreForUser(leaderboard?.urlName);

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

    // On successful update, clear the form
    useEffect(() => {
        if (didUpdateScore) {
            reset();
            userInputRef.current.focus();
        }
    }, [didUpdateScore, reset]);

    return (
        <Modal {...rest} isOpen={isOpen} isWide={true} onClose={onClose}>
            <ModalTitle>Edit Scores</ModalTitle>
            {isLoadingScores || isLoadingUsers ? (
                <PageLoader />
            ) : (
                <>
                    <div className="mb-4 rounded-md border border-gray-300 bg-gray-50 p-4 sm:mb-6 sm:p-6 lg:mb-8">
                        <Heading level={3} className="mb-4">
                            Add Score
                        </Heading>
                        <form
                            className="flex flex-col items-start justify-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <div className="w-full sm:basis-8/12 md:basis-9/12">
                                <Controller
                                    name="user"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Combobox
                                            id="edit-score-user"
                                            inputProps={{
                                                ref: userInputRef,
                                                placeholder: "User",
                                                autoFocus: true,
                                            }}
                                            hasErrors={!!userError}
                                            withHelper={userError}
                                            options={filteredUsers}
                                            getDisplayValue={(val) =>
                                                val
                                                    ? `${val.person.forename} ${val.person.surname}`
                                                    : ""
                                            }
                                            getOption={(option) => ({
                                                key: `${option.usersId}`,
                                                value: `${option.usersId}`,
                                                primaryLabel: `${option.person.forename} ${option.person.surname}`,
                                                secondaryLabel: `${option.displayName}`,
                                            })}
                                            onQueryChange={setUserQuery}
                                            disabled={isUpdatingScore}
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-full sm:basis-4/12 md:basis-3/12">
                                <Input
                                    type="text"
                                    id="edit-score-score"
                                    placeholder="Score"
                                    hasErrors={!!scoreError}
                                    withHelper={scoreError}
                                    disabled={isUpdatingScore}
                                    {...register("score", {
                                        required: true,
                                        maxLength: 100,
                                    })}
                                />
                            </div>
                            <div className="w-full flex-1">
                                <Button
                                    as="button"
                                    type="submit"
                                    color="brand"
                                    className="w-full"
                                    disabled={isUpdatingScore}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Table
                        data={scores}
                        columns={leaderboardScoresTableColumns()}
                        headerProps={{
                            className: "hidden",
                        }}
                    />
                </>
            )}
        </Modal>
    );
};

AdminEditLeaderboardScoresModal.propTypes = {
    leaderboard: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminEditLeaderboardScoresModal;
