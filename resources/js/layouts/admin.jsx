import { Outlet } from "react-router-dom";
import LoginCta from "../components/login-cta";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";
import { useIsAuthenticated } from "../contexts/auth";

export const navigation = [
    { name: "Leaderboards", to: "/admin/leaderboards" },
    { name: "Users", to: "/admin/users" },
];

const AdminLayout = () => {
    const isAuthenticated = useIsAuthenticated();

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
