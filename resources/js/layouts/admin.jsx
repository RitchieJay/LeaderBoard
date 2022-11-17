import { InteractionType } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGetMe } from "../api/users";
import LoginCta from "../components/login-cta";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";
import PageLoader from "../components/page-loader";
import { useAccessToken, useAuth, useIsAuthenticated } from "../contexts/auth";

export const navigation = [
    { name: "Leaderboards", to: "/admin/leaderboards" },
    { name: "Users", to: "/admin/users" },
];

const AdminLayout = () => {
    const { inProgress: msalInProgress } = useMsal();
    const { setUser, userIsLoading } = useAuth();
    const isAuthenticated = useIsAuthenticated();
    const { accessToken, accessTokenIsLoading } = useAccessToken();

    // Fetch data
    const { data: fetchedUser, isLoading: fetchedUserIsLoading } = useGetMe();

    // Resolve and store the authenticated user
    useEffect(() => {
        setUser({ user: fetchedUser, userIsLoading: !!accessToken && fetchedUserIsLoading });
    }, [fetchedUser, fetchedUserIsLoading, accessToken, setUser]);

    return (
        <>
            <Navbar navigation={isAuthenticated ? navigation : []} />
            <PageHeader />

            <main>
                <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">
                    {(!accessToken && accessTokenIsLoading) ||
                    userIsLoading ||
                    msalInProgress !== InteractionType.None ? (
                        <PageLoader />
                    ) : isAuthenticated ? (
                        <Outlet />
                    ) : (
                        <LoginCta />
                    )}
                </div>
            </main>
        </>
    );
};

AdminLayout.propTypes = {};

export default AdminLayout;
