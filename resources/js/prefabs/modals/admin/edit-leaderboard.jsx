import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Link from "../../../components/link";
import Modal, { ModalTitle } from "../../../components/modal";
import PageLoader from "../../../components/page-loader";
import Select from "../../../components/select";
import useForm from "../../forms/admin/edit-leaderboard";

const AdminEditLeaderboardModal = ({ leaderboard, isOpen, onClose, ...rest }) => {
    // Configure the form
    const {
        register,
        resetForm,
        handleFormSubmit,
        rankingMethodsOptions,
        themeOptions,
        updateLeaderboard,
        archiveLeaderboard,
        urlNameIsAutoGenerated,
        setUrlNameIsAutoGenerated,
        isLoadingRankingMethods,
        isPerformingAction,
        didCompleteAction,
        didFailAction,
        errors,
    } = useForm(leaderboard);

    // When actions succeed, close the modal
    useEffect(() => {
        if (didCompleteAction && isOpen) {
            onClose();
        }
    }, [didCompleteAction, isOpen, onClose]);

    // Hook into URL name change to determine whether it is auto-generated
    const { onChange: onFormUrlNameChange, ...urlNameRegisterProps } = register("urlName", {
        required: true,
        maxLength: 100,
        pattern: /^[A-Za-z0-9-]+$/g,
    });
    const onUrlNameChange = useCallback(
        (value) => {
            setUrlNameIsAutoGenerated(false);
            return onFormUrlNameChange(value);
        },
        [setUrlNameIsAutoGenerated, onFormUrlNameChange]
    );

    return (
        <Modal {...rest} isOpen={isOpen} onClose={onClose}>
            <ModalTitle>{leaderboard ? "Edit" : "Create"} Leaderboard</ModalTitle>
            {isLoadingRankingMethods ? (
                <PageLoader />
            ) : (
                <form
                    className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8"
                    onSubmit={handleFormSubmit}
                >
                    {didFailAction && <Alert color="red">Something went wrong. Try again</Alert>}
                    <div>
                        <Input
                            type="text"
                            id="edit-leaderboard-name"
                            withLabel="Name"
                            hasErrors={!!errors.name}
                            withHelper={errors.name}
                            placeholder="E.g. Rocket League Tournament"
                            disabled={isPerformingAction || didCompleteAction}
                            {...register("name", {
                                required: true,
                                maxLength: 100,
                            })}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            id="edit-leaderboard-url-name"
                            withLabel={
                                <div className="space-x-1">
                                    <span>URL Path</span>
                                    {!urlNameIsAutoGenerated && (
                                        <>
                                            <span>&middot;</span>
                                            <Link
                                                as="span"
                                                onClick={() => {
                                                    setUrlNameIsAutoGenerated(true);
                                                }}
                                            >
                                                Generate from name
                                            </Link>
                                        </>
                                    )}
                                </div>
                            }
                            hasErrors={!!errors.urlName}
                            withHelper={
                                errors.urlName ||
                                "URL path can only contain letters, numbers, and hyphens"
                            }
                            placeholder="E.g. rocket-league-tournament"
                            disabled={isPerformingAction || didCompleteAction}
                            {...urlNameRegisterProps}
                            onChange={onUrlNameChange}
                        />
                    </div>
                    <div>
                        <Select
                            id="edit-leaderboard-ranking-method"
                            withLabel="Ranking Method"
                            hasErrors={!!errors.rankingMethodsId}
                            withHelper={errors.rankingMethodsId}
                            disabled={isPerformingAction || didCompleteAction}
                            options={rankingMethodsOptions}
                            {...register("rankingMethodsId", {
                                required: true,
                            })}
                        />
                    </div>
                    <div>
                        <Select
                            id="edit-leaderboard-theme"
                            withLabel="Theme"
                            hasErrors={!!errors.theme}
                            withHelper={errors.theme}
                            disabled={isPerformingAction || didCompleteAction}
                            options={themeOptions}
                            {...register("theme", {
                                required: true,
                            })}
                        />
                    </div>
                    <div className="flex flex-row justify-between space-x-3 border-t border-gray-300 pt-4">
                        <div>
                            {leaderboard && (
                                <>
                                    {leaderboard.isActive ? (
                                        <Button
                                            as="button"
                                            type="button"
                                            color="red"
                                            disabled={isPerformingAction || didCompleteAction}
                                            onClick={() => archiveLeaderboard(leaderboard.urlName)}
                                        >
                                            Archive
                                            <span className="hidden sm:inline">
                                                &nbsp;Leaderboard
                                            </span>
                                        </Button>
                                    ) : (
                                        <Button
                                            as="button"
                                            type="button"
                                            color="default"
                                            disabled={isPerformingAction || didCompleteAction}
                                            onClick={() =>
                                                updateLeaderboard({
                                                    existingUrlName: leaderboard.urlName,
                                                    name: leaderboard.name,
                                                    urlName: leaderboard.urlName,
                                                    rankingMethodsId:
                                                        leaderboard.rankingMethod.rankingMethodsId,
                                                    theme: leaderboard.theme,
                                                })
                                            }
                                        >
                                            Enable
                                            <span className="hidden sm:inline">
                                                &nbsp;Leaderboard
                                            </span>
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
                                {leaderboard ? "Save" : "Create"}
                                <span className="hidden sm:inline">&nbsp;Leaderboard</span>
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </Modal>
    );
};

AdminEditLeaderboardModal.propTypes = {
    leaderboard: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AdminEditLeaderboardModal;
