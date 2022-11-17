import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetMe } from "../api/users";
import LoginCta from "../components/login-cta";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";
import { useAcquireAccessToken, useIsAuthenticated } from "../contexts/auth";

const navigation = [
    { name: "Leaderboards", to: "/admin/leaderboards" },
    { name: "Users", to: "/admin/users" },
];

const AdminLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    const acquireAccessToken = useAcquireAccessToken();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Fetch data
    const { data: user, isFetching: isLoadingUser } = useGetMe();

    // Acquire an access token
    useEffect(() => {
        (async () => {
            await acquireAccessToken();
        })();
    }, [acquireAccessToken]);

    // If we are authenticated, forward onto the first nav route
    useEffect(() => {
        if (isAuthenticated && user) {
            // Check to ensure we are on a valid page
            const matchedNavigation = navigation.filter(({ to }) => {
                return pathname.startsWith(`${to}`);
            });

            // If not, redirect to the first page
            if (matchedNavigation.length < 1) {
                navigate(navigation[0].to);
            }
        }
    }, [isAuthenticated, pathname, navigate, user]);

    return (
        <>
            <Navbar navigation={isAuthenticated ? navigation : []} user={user} isLoadingUser={isLoadingUser} />
            <PageHeader />

            <main>
                <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">
                    {isAuthenticated && user ? <Outlet /> : <LoginCta />}
                </div>
            </main>
        </>
    );
};

AdminLayout.propTypes = {};

export default AdminLayout;
