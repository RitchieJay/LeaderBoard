import PropTypes from "prop-types";
import { useGetScoresForLeaderboard } from "../../../api/leaderboards";
import Modal, { ModalTitle } from "../../../components/modal";
import PageLoader from "../../../components/page-loader";
import Table from "../../../components/table";
import { columns as leaderboardScoresTableColumns } from "../../../prefabs/tables/admin/leaderboard-scores";

const AdminEditLeaderboardScoresModal = ({ leaderboard, isOpen, onClose, ...rest }) => {
    // Data
    const { data: scores = [], isLoading: isLoadingScores } = useGetScoresForLeaderboard(
        leaderboard.urlName
    );

    return (
        <Modal {...rest} isOpen={isOpen} isWide={true} onClose={onClose}>
            <ModalTitle>Edit Scores</ModalTitle>
            {isLoadingScores ? (
                <PageLoader />
            ) : (
                <>
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
