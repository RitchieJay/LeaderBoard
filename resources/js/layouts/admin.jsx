import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import PageHeader from "../components/page-header";

const navigation = [
    { name: "Leaderboards", to: "/admin/leaderboards" },
    { name: "Users", to: "/admin/users" },
];

const userNavigation = [{ name: "Sign out", to: "#" }];

const AdminLayout = () => {
    return (
        <>
            <Navbar navigation={navigation} userNavigation={userNavigation} />
            <PageHeader />

            <main>
                <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

AdminLayout.propTypes = {};

export default AdminLayout;
