import PropTypes from "prop-types";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useGetScoresForLeaderboard } from "../../../api/leaderboards";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import Combobox from "../../../components/combobox";
import Heading from "../../../components/heading";
import Input from "../../../components/input";
import Modal, { ModalTitle } from "../../../components/modal";
import PageLoader from "../../../components/page-loader";
import Table from "../../../components/table";
import { columns as leaderboardScoresTableColumns } from "../../../prefabs/tables/admin/leaderboard-scores";
import useForm from "../../forms/admin/add-leaderboard-score";

const AdminEditLeaderboardScoresModal = ({ leaderboard, isOpen, onClose, ...rest }) => {
    // Configure the form
    const {
        register,
        control,
        resetForm,
        handleFormSubmit,
        userInputRef,
        setUserQuery,
        isLoadingUsers,
        filteredUsers,
        isUpdatingScore,
        didUpdateScore,
        didFailUpdatingScore,
        errors,
    } = useForm(leaderboard);

    // Data
    const { data: scores = [], isLoading: isLoadingScores } = useGetScoresForLeaderboard(
        leaderboard.urlName
    );

    // On successful update, clear the form
    useEffect(() => {
        if (didUpdateScore) {
            resetForm();
        }
    }, [didUpdateScore, resetForm]);

    return (
        <Modal {...rest} isOpen={isOpen} isWide={true} onClose={onClose}>
            <ModalTitle>Edit Scores</ModalTitle>
            {isLoadingScores || isLoadingUsers ? (
                <PageLoader />
            ) : (
                <>
                    {didFailUpdatingScore && (
                        <Alert color="red" className="mb-4">
                            Something went wrong. Try again
                        </Alert>
                    )}
                    <div className="mb-4 rounded-md border border-gray-300 bg-gray-50 p-4 sm:mb-6 sm:p-6 lg:mb-8">
                        <Heading level={3} className="mb-4">
                            Add Score
                        </Heading>
                        <form
                            className="flex flex-col items-start justify-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                            onSubmit={handleFormSubmit}
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
                                            hasErrors={!!errors.user}
                                            withHelper={errors.user}
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
                                    hasErrors={!!errors.score}
                                    withHelper={errors.score}
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
