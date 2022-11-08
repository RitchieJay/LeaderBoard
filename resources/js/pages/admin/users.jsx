import { useEffect } from "react";
import { useNavigationContext } from "../../contexts/navigation";

const AdminUsersPage = () => {
    const { setPageTitle } = useNavigationContext();

    useEffect(() => {
        setPageTitle("Users");
    }, [setPageTitle]);

    return <p>Users page!</p>;
};

AdminUsersPage.propTypes = {};

export default AdminUsersPage;
