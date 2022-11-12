import { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";
import LoginCta from "../components/login-cta";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";
import { useAcquireAccessToken, useIsAuthenticated } from "../contexts/auth";

const navigation = [
    { name: "Leaderboards", to: "/admin/leaderboards" },
    { name: "Users", to: "/admin/users" },
];

export const loader = ({ request }) => {
    // Check to ensure we are on a valid page
    const matchedNavigation = navigation.filter(({ to }) => {
        return request.url.startsWith(`${import.meta.env.VITE_APP_URL}${to}`);
    });

    // If not, redirect to the first page
    if (matchedNavigation.length < 1) {
        return redirect(navigation[0].to);
    }

    return {};
};

const AdminLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    const acquireAccessToken = useAcquireAccessToken();

    // Acquire an access token
    useEffect(() => {
        (async () => {
            await acquireAccessToken();
        })();
    }, [acquireAccessToken]);

    return (
        <>
            <Navbar navigation={isAuthenticated ? navigation : []} />
            <PageHeader />

            <main>
                <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">
                    {isAuthenticated ? <Outlet /> : <LoginCta />}
                </div>
            </main>
        </>
    );
};

AdminLayout.propTypes = {};

export default AdminLayout;
