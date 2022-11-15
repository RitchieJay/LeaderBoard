import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByDisplayName } from "../../api/users";
import Spinner from "../../components/spinner";
import { usePage } from "../../contexts/page";
import { throwNotFound } from "../../utils/routing";

const AdminEditUserPage = () => {
    const { displayName } = useParams();
    const { setPageTitle, setPageTabs, setActivePageTab } = usePage();
    const { data: user = null, isFetching: isLoadingUser } = useGetUserByDisplayName(displayName);

    // Configure the page
    useEffect(() => {
        setPageTitle("Edit User");
        setPageTabs([]);
        setActivePageTab(null);
    }, [setPageTitle, setPageTabs, setActivePageTab]);

    // Loading state
    if (isLoadingUser && !user) {
        return (
            <div className="flex flex-row items-center justify-center space-x-2">
                <Spinner className="h-5 w-5 text-gray-600" />
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

    // Throw if the user isn't found
    if (!user) {
        throwNotFound("User Not Found");
    }

    return <>{user.privateForename}</>;
};

AdminEditUserPage.propTypes = {};

export default AdminEditUserPage;
