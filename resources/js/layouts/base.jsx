import { InteractionType } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetMe } from "../api/users";
import PageLoader from "../components/page-loader";
import { useAccessToken, useAuth } from "../contexts/auth";

const BaseLayout = () => {
    const { inProgress: msalInProgress } = useMsal();
    const { setUser, userIsLoading } = useAuth();
    const { accessToken, accessTokenIsLoading } = useAccessToken();

    // Fetch data
    const { data: fetchedUser, isLoading: fetchedUserIsLoading } = useGetMe();

    // Resolve and store the authenticated user
    useEffect(() => {
        setUser({ user: fetchedUser, userIsLoading: !!accessToken && fetchedUserIsLoading });
    }, [fetchedUser, fetchedUserIsLoading, accessToken, setUser]);

    return (
        <>
            {(!accessToken && accessTokenIsLoading) ||
            userIsLoading ||
            msalInProgress !== InteractionType.None ? (
                <div className="p-4 sm:p-6 lg:p-8">
                    <PageLoader />
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
};

BaseLayout.propTypes = {};

export default BaseLayout;
