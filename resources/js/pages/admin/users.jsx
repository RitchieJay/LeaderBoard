import { useEffect } from "react";
import { usePage } from "../../contexts/page";

const AdminUsersPage = () => {
    const { setPageTitle } = usePage();

    useEffect(() => {
        setPageTitle("Users");
    }, [setPageTitle]);

    return <p>Users page!</p>;
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
